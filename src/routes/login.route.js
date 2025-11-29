import express from 'express';
import { renderLogin, postLogin } from '../controllers/login.controller.js';
import passport from 'passport';

const loginRouter = express.Router();

loginRouter.get('/', renderLogin);

loginRouter.post('/', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.redirect(`/login?error=${encodeURIComponent(info.message)}`);

        req.user = user;
        return postLogin(req, res, next);
    })(req, res, next);
});

export default loginRouter;
