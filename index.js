import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import expressRouter from './routes/authRoutes.js';
import productRouter from './routes/productRouter.js';
import categoryRouter from './routes/categoryRoute.js';
import connecteDB from './config/db.js';
const app = express();
const PORT = process.env.PORT || 3000;
connecteDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},

		(accessToken) => {
			console.log(accessToken);
		}
	)
);

app.use('/api/v1/product', productRouter);
app.use('/api/v1/category', categoryRouter);
app.use(expressRouter);

app.listen(
	PORT,
	console.log(`The server is running in ${process.env.NODE_ENV} on  ${PORT}`)
);
