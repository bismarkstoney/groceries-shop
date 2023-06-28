import  dotenv from 'dotenv'
dotenv.config()
import passport from "passport";
import LocalStrategy from "passport-local"
import  GOOGLESTRATEGY  from "passport-google-oauth20"
import Users from '../models/User';

// Configure Passport with local strategy
passport.use(
    new LocalStrategy((username, password, done) => {
      Users.findOne({ username }, (err, user) => {
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




  passport.use(new GOOGLESTRATEGY({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
        // Find or create user in MongoDB
        // User.findOne({ googleId: profile.id }, (err, user) => {
        //   if (err) return done(err);
        //   if (!user) {
        //     const newUser = new User({
        //       googleId: profile.id,
        //       username: profile.emails[0].value,
        //       name: profile.displayName,
        //     });
        //     newUser.save((err) => {
        //       if (err) return done(err);
        //       return done(null, newUser);
        //     });
        //   } else {
        //     return done(null, user);
        //   }
        // });
        console.log(profile)
      }
    )
  );
  
  // Configure Passport with session support
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
      done(err, user);
    });
  });



  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // Assuming your login form has an input field with name="email"
        passwordField: 'password', // Assuming your login form has an input field with name="password"
      },
      async (email, password, done) => {
        try {
          // Replace this with your own logic to find the user in your database
          const user = await Users.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }
  
          const isValidPassword = await user.checkPassword(password);
  
          if (!isValidPassword) {
            return done(null, false, { message: 'Incorrect email or password.' });
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  
  // Serialize and deserialize user functions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
      // Replace this with your own logic to find the user in your database
      const user = await Users.findById(id);
  
      if (!user) {
        return done(null, false);
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  export default passport;