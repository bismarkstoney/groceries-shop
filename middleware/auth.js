const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure Passport with local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: "Incorrect username" });
  
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );




  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
        // Find or create user in MongoDB
        User.findOne({ googleId: profile.id }, (err, user) => {
          if (err) return done(err);
          if (!user) {
            const newUser = new User({
              googleId: profile.id,
              username: profile.emails[0].value,
              name: profile.displayName,
            });
            newUser.save((err) => {
              if (err) return done(err);
              return done(null, newUser);
            });
          } else {
            return done(null, user);
          }
        });
      }
    )
  );
  
  // Configure Passport with session support
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  export default passport;