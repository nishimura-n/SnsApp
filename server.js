const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const helmet = require('helmet')
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const uploadRoute = require("./routes/upload");
const stripeRoute = require("./routes/stripe");
const PORT = 5005;
const mongoose = require("mongoose");
const path = require("path");
mongoose.set('strictQuery', false);
require("dotenv").config();

//データベース接続
mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log("DBと接続中・・・");//control+Cで強制終了(control+Zはしたらダメ！)
})
.catch((err) => {
  console.log(err);
});

// cookie-parserの設定
app.use(cookieParser());

// csurfの設定
const csrfProtection = csrf({
  cookie: true, // CSRFトークンをcookieに保存する
  ignoreMethods: ['GET', 'HEAD', 'OPTIONS'], // CSRFトークンを生成しないリクエストメソッド
});

// CSRFトークンを生成して、セッションに保存するミドルウェア
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    // GETやHEADリクエストにはCSRFトークンは必要ないため、何もしない
    return next();
  }
  // CSRFトークンを生成し、セッションに保存する
  const csrfToken = req.csrfToken();
  req.session.csrfToken = csrfToken;
  // レスポンスにCSRFトークンをセットする
  res.cookie('XSRF-TOKEN', csrfToken);
  next();
});

// csurfミドルウェアの設定
app.use(csrfProtection);

//ミドルウェア
app.use(helmet());//セキュリティ対策
// XSS対策
app.use(helmet.xssFilter());
// CSRF対策
app.use(helmet.csrf({ cookie: true }));
// SameSite属性の設定
app.use(helmet({
  referrerPolicy: { policy: 'same-origin' },
  featurePolicy: {
    geolocation: ["'none'"]
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true
  }
}));
app.use(
  helmet.crossOriginResourcePolicy({ 
    policy: "cross-origin"
  }),
  helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'",
    'https://checkout.stripe.com/'],
    connectSrc: ["'self'",
    'https://script.google.com/',
    'https://script.googleusercontent.com/',
    'https://api.openweathermap.org/',
    'https://buy.stripe.com/',
    'https://checkout.stripe.com/'],
    "form-action": ["'self'",
    'https://sns-app-simple.herokuapp.com/api/stripe/create-checkout-session',
    'https://buy.stripe.com/test_7sI180bUO55cdvWdQQ',
    'https://checkout.stripe.com/'],
    "require-trusted-types-for": ["'script'"],
    'img-src': ["'self'", 
    'http://openweathermap.org/']
  }
}));
// トークンの有効期限の設定
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(helmet.hsts({ maxAge: expiryDate }));
app.disable('x-powered-by');
app.use(`/api/stripe`, stripeRoute);//JSON形式で渡したらだめ
app.use(`/images`,express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(`/api/users`, userRoute);
app.use(`/api/auth`, authRoute);
app.use(`/api/posts`, postRoute);
app.use(`/api/upload`, uploadRoute);

app.use(express.static(path.join(__dirname,`frontend/build`)));
app.get(`*`,(rec,res)=>{
  res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
})

app.listen(process.env.PORT || PORT, () => console.log("サーバーが起動しました"));