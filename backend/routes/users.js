const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//CRUD
//ユーザー情報の更新
router.put("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            });
            res.status(200).json("ユーザ情報が更新されました");
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を更新できます");
    }
})

//ユーザー情報の削除
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("ユーザ情報が削除されました");
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("あなたは自分のアカウントの時だけ情報を削除できます");
    }
})

//クエリでユーザー情報を取得
router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
         ? await User.findById(userId) 
         : await User.findOne({username: username});
        const { password, updatedAt, ...other} = user._doc;
        return res.status(200).json(other);
    }catch (err){
        return res.status(500).json(err);
    }
});

// トークンの認証とユーザー情報を取得
router.post("/jwt",async (req, res) => {
    const token = req.body.token;
    
    // トークンが存在しない場合の処理
    if (!token) {
        return res.status(401).json({ message: 'トークンが提供されていません' });
    }
    let decoded = {};
    try{
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch(err){
        if (err instanceof jwt.TokenExpiredError) {
            //トークンの有効期限切れ
            return res.status(401).send('Token expired');
        }
        return res.status(401).json({ message: '不正なトークンです' });
    }
    //JWTの認証
    jwt.verify(token, process.env.JWT_SECRET, async(err) => {
        const userId = decoded.user;
        const user = await User.findById(userId);
        const { password, updatedAt, ...other} = user._doc;
        if (err) {
          return res.status(400).json({ message: '有効でないトークンです。' });
        } else {
          //ユーザー情報を返す
          return res.status(200).json(other);
        }
      });
  }
);

//ユーザーのフォロー
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //フォロワーに自分がいなかったらフォローできる
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $push: {
                        followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォローに成功しました！");
            }else {
                return res.status(403).json("あなたはすでにこのユーザーをフォローしています．");
            }
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォローできません．");
    }
})

//ユーザーのフォローを外す
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            //フォロワーに存在したらフォローを外せる
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId,
                    },
                });
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id,
                    },
                });
                return res.status(200).json("フォロー解除しました！");
            }else {
                return res.status(403).json("このユーザーはフォロー解除できません");
            }
        }catch (err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(500).json("自分自身をフォロー解除できません．");
    }
})

module.exports = router;
