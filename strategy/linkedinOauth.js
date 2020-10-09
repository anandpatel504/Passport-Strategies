const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const knex = require('../config/config');
const LinkedinUserService = require('../services/linkedinUsers');
const Services = new LinkedinUserService();

module.exports = (app, passport) => {
    
    passport.use(new LinkedInStrategy({
        clientID: process.env.LINKEDIN_KEY,
        clientSecret: process.env.LINKEDIN_SECRET,
        callbackURL: "http://localhost:2020/auth/linkedin/callback",
        scope: ['r_emailaddress', 'r_liteprofile'],
      },
      
      async function(accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const emails = profile.emails[0].value;
        const id = profile.id;
        const photos = profile.photos[0].value;
        console.log(accessToken, "linkedin user accessToken");
        const userData = await Services.findOne({linkedin_id:id});
        // console.log(userData, "userData");

        if (userData.length>0){
            var userInfoUpdate = await Services.Update({"linkedin_id": id, "first_name": firstName, "last_name": lastName, "email": emails, "profile_picture": photos})
            if (userInfoUpdate) {
              var userInfo = await Services.findOne({linkedin_id:id});
            }
          }else{
            var userInfo = await Services.Create({"linkedin_id": id, "first_name": firstName, "last_name": lastName, "email": emails, "profile_picture": photos})
          }
        done(null, userInfo);
      }));

    passport.serializeUser((user, done) =>{
        done(null, user)
    });

    app.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE'  }));

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', { successRedireact: '/', failureRedirect: '/login' }),
        function (req, res) {
            console.log(res.req.user, "user");
            req.app.set('user', res.req.user)
            res.redirect('/home');
        }
    );
}