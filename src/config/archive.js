import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../models/mongo.js';
import { validPassword } from './password.js';

const authentication = async (email, password, done) => {
  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return done(null, false, {
        message: 'This user is not registered.',
      });
    }

    try {
      const isMatch = await validPassword(password, user.password);

      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'The password you entered is incorrect.',
        });
      }
    } catch (err) {
      return done(err);
    }
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy({ usernameField: 'email' }, authentication);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
