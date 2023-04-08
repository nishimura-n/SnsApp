const router = require("express").Router() 
const User = require("../models/User");
const express = require("express");
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))

//テスト用のシークレットAPIキー
const stripe = require('stripe')('sk_test_51MnxKpDLrv5t9LkNrM9plHy5BYxDRqpzEHVlvErR23pHj8EKW8hsmPT74hplERZ0W2pp2UddIiu6NLvXo5ObTMqi00bau9FssB');

//チェックアウトにリダイレクト
router.post("/create-checkout-session", async (req, res) => {
   //console.log(JSON.parse(request.body));
  const userId = req.body.userId;
  const user = await User.findById(userId);
  console.log(user.isBuyer)
  if(user.isBuyer) {
    res.redirect(303, "http://localhost:3000/shop?canceled=true");
  }else{
  const session = await stripe.checkout.sessions.create({
    customer_creation: 'always',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1Mo61SDLrv5t9LkNq12V8EpV',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/shop?success=true`,
    cancel_url: `http://localhost:3000/shop?canceled=true`,
  });
  console.log(session.id)
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
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = 'whsec_33c885667b789890330dba6e987633a6b628e03c4ed4427286d9b454ae6708e8';

router.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
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

  //console.log(JSON.parse(request.body));
  //console.log(JSON.parse(request.body).data.object.id);

  //ローカルの場合，stripe listen --forward-to localhost:5005/api/stripe/webhookを実行しないといけない
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'checkout.session.completed':
        const custmer = event.data.object.id;
        console.log(custmer);
        // console.log(isAdmin.isAdmin);
           const user = await User.findOneAndUpdate({sessionId: custmer},{
               $set: {isBuyer: 'true'},
           });
          console.log(`${event.type}.`);
        break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

module.exports = router;