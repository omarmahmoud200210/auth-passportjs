import express from 'express';
import path from 'path';
import https from 'https';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectWithMongo from './config/mongodb.js';
import passport from './config/passport.js';
import registerRoute from './routes/register.route.js';
import loginRouter from './routes/login.route.js';
import logoutRouter from './routes/logout.route.js';
import refreshRouter from './routes/refresh.route.js';
import forgetRouter from './routes/forget-password.route.js';
import resetRouter from './routes/reset-password.route.js';
import Users from './models/mongo.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// setup the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// initialize passport
app.use(passport.initialize());

// the routes
app.get('/home', (res) => res.render('home'));
app.use('/login', loginRouter);
app.use('/register', registerRoute);
app.use('/logout', logoutRouter);
app.use('/refresh', refreshRouter);
app.use('/forget-password', forgetRouter);
app.use('/reset-password', resetRouter);

app.get(
  '/dashboard',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, async (err, user, info) => {
      if (err) return next(err);
      if (!user) res.status(401).render('errors/401');
      
      const adminUser = await Users.findOne({ email: 'omar.mahmoud200210@gmail.com' });
      
      if (adminUser) {
        adminUser.role = 'admin';
        await adminUser.save();
      }
      
      req.user = user;
      return next();
    })(req, res, next);
  },
  (req, res) => {
    const username = req.user.username.toUpperCase() || 'User';
    res.render('dashboard', { user: username, role: req.user.role });
  }
);

app.get('/oops', (req, res) => res.render('errors/oops'));
app.use((req, res) => res.status(404).render('errors/404'));

const serverSSl = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem')),
  },
  app
);

serverSSl.listen(PORT, async () => {
  await connectWithMongo(process.env.MONGO_URL);
  console.log(`Server is running on ${PORT}`);
});
