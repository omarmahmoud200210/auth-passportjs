import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Users from '../models/mongo.js';
import { validPassword } from './password.js';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

// 1. The local passport implementation
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

// 2. The JWT passport implementation
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies['accessToken']; // Read from the 'accessToken' cookie
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY,
};

const strategyOfJwt = async (jwt_payload, done) => {
  try {
    const user = await Users.findById(jwt_payload.sub);
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

const jwt = new JwtStrategy(options, strategyOfJwt);
passport.use(jwt);

// 3. The Google Passport Implementation
const credentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'https://passportjs-auth.vercel.app/auth/google/callback',
};

const googleAuthentication = async (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const user = await Users.findOne({ googleId: profile.id });
    if (user) return done(null, user);
    else {
      const user = new Users({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        password: '',
      });
      await user.save();
      return done(null, user);
    }
  } catch (error) {
    return done(error);
  }
};

const googleStrategy = new GoogleStrategy(credentials, googleAuthentication);
passport.use(googleStrategy);

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
