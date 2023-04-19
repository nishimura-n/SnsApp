const router = require("express").Router() 
const User = require("../models/User");
const express = require("express");
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
require("dotenv").config();

//テスト用のシークレットAPIキー．
const stripe = require('stripe')(process.env.STRIPE_SECRET);

//チェックアウトにリダイレクト
router.post("/create-checkout-session", async (req, res) => {
  const userId = req.body.userId;
  const user = await User.findById(userId);
  //購入済みの場合，キャンセルページにリダイレクト
  if(user.isBuyer) {
    res.redirect(303, `${process.env.API_URL}/shop?canceled=true`);
  }else{
  //Stripe Checkout セッションを作成
  const session = await stripe.checkout.sessions.create({
    customer_creation: 'always',
    line_items: [
      {
        // 販売したい商品の価格ID(例：pr_1234)
        price: process.env.PRICE,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.API_URL}/shop?success=true`,
    cancel_url: `${process.env.API_URL}/shop?canceled=true`,
  });
      try{
          const user = await User.findByIdAndUpdate(userId,{
              $set: {sessionId: session.id},
          });
      }catch (err){
          return res.status(500).json(err);
      }
  res.redirect(303, session.url);
  }
});

//購入判定(Webhook)
//ローカルでエンドポイントをテストするためのStripe CLI webhookのシークレットキー
const endpointSecret = process.env.ENDPOINTSECRET;

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  let event = request.body;
  if (endpointSecret) {
    // Stripeから送られてきた署名を取得する
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  //ローカルの場合，stripe listen --forward-to localhost:5005/api/stripe/webhookを実行しないといけない
  // イベントの処理
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;
    case 'checkout.session.completed'://購入完了時の処理
        const custmer = event.data.object.id;
           const user = await User.findOneAndUpdate({sessionId: custmer},{
               $set: {isBuyer: 'true'},
           });
          console.log(`${event.type}.`);
        break;
    default:
      // 上記以外のイベント処理
      console.log(`Unhandled event type ${event.type}.`);
  }

  // イベントの受信を確認するために200を返す。
  response.send();
});

module.exports = router;