const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knex = require('../config/config.js');
const GoogleUserService = require('../services/googleUsers.js');
const Services = new GoogleUserService();
const jwt = require('jsonwebtoken');

module.exports = (app, passport) =>{

  passport.serializeUser((user, done) =>{
    done(null, user)
  });

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2020/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
      const {sub, name, given_name, family_name, picture, email} = profile._json
      console.log(accessToken, "accessToken");
      const userData = await Services.findOne({google_id:sub});
      // console.log(userData, "userDataservices");
      if (userData.length>0){
        var userInfoUpdate = await Services.Update({"google_id": sub, "full_name": name, "first_name": given_name, "last_name": family_name, "email": email, "profile_picture": picture})
        if (userInfoUpdate) {
          await Services.findOne({google_id:sub});
        }
      }else{
        await Services.Create({"google_id": sub, "full_name": name, "first_name": given_name, "last_name": family_name, "email": email, "profile_picture": picture})
      }
      done(null, profile);
      
    }
  ));

  app.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function(req, res) {
      console.log(res.req.user, "this is response");
      const token = jwt.sign({"id": res.req.user.id,"name": res.req.user.displayName, "email": res.req.user.emails[0].value}, "anand", { expiresIn: '2h' });
      console.log(token, "jwt token");
      req.app.set('user', res.req.user);
      res.redirect('http://localhost:3000/home?token='+token);
      // res.redirect('/home');
  });
}
