const express = require("express");
const app = express();
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

//ミドルウェア
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.disable('x-powered-by');
app.use("/api/stripe", stripeRoute);//JSON形式で渡したらだめ
app.use("/images",express.static(path.join(__dirname,"public/images")))
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/upload", uploadRoute);

app.listen(PORT, () => console.log("サーバーが起動しました"));