
import  dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import session from "express-session"
import  passport  from "passport";
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRoute.js'
import connecteDB from './config/db.js'
const app =express()
const PORT=  process.env.PORT || 3000
connecteDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1/product', productRouter)
app.use('/api/v1/category',categoryRouter)
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
      res.send(`Hello ${req.user.username}! <a href="/logout">Logout</a>`);
    } else {
      res.send(`Hello Guest! <a href="/login">Login</a>`);
    }
  });
  
  app.get("/login", (req, res) => {
    res.send(`
      <form action="/login" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <a href="/register">Register</a>
    `);
  });
  
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
  
  app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    }
  );
  
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} on  ${PORT}`))