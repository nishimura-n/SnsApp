const passport = require("passport");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();

// passport-localの設定
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async(username,password,done) => {
      //console.log(username);
      //console.log(password);
      const user = await User.findOne({ email: username });
      // console.log(user);
      if(!user){
        done(null, false, {
          message: "usernameまたはpasswordが違います",
        });
      }else{ 
        const vailedPassword = password === user.password;
        if(!vailedPassword){
        done(null, false, {
          message: "usernameまたはpasswordが違います",
        });
      }else {
        return done(null, username);
      };
    }
  }
  )
);

// passport-jwtの設定
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// アルゴリズムを選択する
opts.algorithms = ['HS256', 'RS256'];

passport.use(
  new JWTStrategy(opts, (jwt_payload,done) => {
    done(null, jwt_payload);
  })
);

// passportをexport
module.exports = passport;