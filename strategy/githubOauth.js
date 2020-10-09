const GitHubStrategy = require('passport-github2').Strategy;
const knex = require('../config/config');
const GithubUserService = require('../services/githubUsers');
const Services = new GithubUserService();

module.exports = (app, passport) => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:2020/auth/github/callback"
      },

      async function(accessToken, refreshToken, profile, done) {
        console.log(profile._json, "github profile");
        const {login, id, avatar_url, name, email} = profile._json
        const userData = await Services.findOne({github_id:id});
        // console.log(userData, "userData");

        if (userData.length>0){
            var userInfoUpdate = await Services.Update({"github_id": id, "name": name, "user_name": login, "email": String(email), "profile_picture": avatar_url})
            if (userInfoUpdate) {
              var userInfo = await Services.findOne({github_id:id});
            }
          }else{
            var userInfo = await Services.Create({"github_id": id, "name": name, "user_name": login, "email": String(email), "profile_picture": avatar_url})
          }
        done(null, userInfo);
      }
    ));

    passport.serializeUser((user, done) =>{
        done(null, user)
    });

    app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // console.log(res.req.user, "this is res");
        req.app.set('user', res.req.user);
        res.redirect('/home');
    });
}
