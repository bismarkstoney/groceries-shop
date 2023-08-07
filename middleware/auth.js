import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Users from '../models/User.js';

const googlePassport = () => {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: '/auth/google/callback',
			},
			(accessToken, refreshToken, profile, done) => {
				Users.findOne({ userId: profile.id }).then((existingUser) => {
					if (existingUser) {
						done(null, existingUser);
					} else {
						const email = profile.emails[0].value;
						const photo = profile.photos[0].value;
						const familyName = profile.name.familyName;
						const givenName = profile.name.givenName;
						new Users({
							userId: profile.id,
							email,
							avatarImage: photo,
							firstName: familyName,
							lastName: givenName,
						})
							.save()
							.then((user) => done(null, user));
					}
				});
			}
		)
	);
};

export default googlePassport;
