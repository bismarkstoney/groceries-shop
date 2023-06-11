
import  dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import  GOOGLESTRATEGY  from 'passport-google-oauth20'
import passport from 'passport'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRoute.js'
import connecteDB from './config/db.js'
const app =express()
const PORT=  process.env.PORT || 3000
connecteDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/api/v1/product', productRouter)
app.use('/api/v1/category',categoryRouter)
passport.use (new GOOGLESTRATEGY({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : '/auth/google/callback'
}, (accessToken, refreshToken, profile, done)=>{
    console.log(accessToken,profile )
}))
app.get('/auth/api/v1/google', passport.authenticate('google',{
    scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))
app.listen(PORT, console.log(`The server is running in ${process.env.NODE_ENV} on  ${PORT}`))