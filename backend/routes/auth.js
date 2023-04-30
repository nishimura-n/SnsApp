const router = require("express").Router();
const User = require("../models/User");
const passport = require("../security/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//ユーザー登録
router.post("/register", async (req, res) => {
    try {
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        const user = await newUser.save();
        return res.status(200).json(user);
    } catch (err){
        return res.status(500).json(err);
    }
})

//JWTを用いたログイン
router.post("/login",
//セッションを使用しないで認証
passport.authenticate('local',{ session: false }),
async (req,res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        const payload = { user: user._id };
        //JWTトークンを生成
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30m",
        });
        return res.status(200).json({token});
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;