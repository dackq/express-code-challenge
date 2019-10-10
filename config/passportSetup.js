const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

passport.use(
	new LocalStrategy(async (email, password, done) => {
		try {
			const user = await User.findOne({ email });
			if (!user) {
				return done(null, false, {
					message: "Invalid email or password"
				});
			}
			if (!(await user.validPassword(password))) {
				return done(null, false, {
					message: "invalid email or password"
				});
			}
			return done(null, user);
		} catch (err) {
			throw new Error(err);
		}
	})
);
