import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const googlePassport = () => {
	console.log('hi');
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			(accessToken, refreshToken, profile, done) => {
				console.log(accessToken);
				console.log(profile);
				console.log(refreshToken);
				console.log('kk');
			}
		)
	);
};

export default googlePassport;
