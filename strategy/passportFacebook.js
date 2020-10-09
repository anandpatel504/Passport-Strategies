
const FacebookStrategy = require('passport-facebook').Strategy;
const knex = require('../config/config');
const FacebookUserService = require('../services/facebookUsers');
const Services = new FacebookUserService();

module.exports = (app, passport) =>{

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:2020/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
      },

      async function(accessToken, refreshToken, profile, done) {
        const {id, name, email} = profile._json
        const picture = profile._json.picture.data.url
        // console.log(profile, "profile data");
        console.log(accessToken, "accessToken");
        const userData = await Services.findOne({facebook_id:id});
        console.log(userData, "userData");

        if (userData.length>0){
          var userInfoUpdate = await Services.Update({"facebook_id": id, "name": name, "email": email, "profile_picture": picture})
          if (userInfoUpdate) {
            var userInfo = await Services.findOne({facebook_id:id});
          }
        }else{
          var userInfo = await Services.Create({"facebook_id": id, "name": name, "email": email, "profile_picture": picture})
        }

        done(null, userInfo);
      }
    ));

    passport.serializeUser((user, done) =>{
        done(null, user)
    });

    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedireact:'/',failureRedirect: '/login' }),
        function (req, res) {
            console.log(res.req.user, "res data");
            // res.send('Home Page')
            req.app.set('user', res.req.user);
            res.redirect('/home');
        }
    );
}