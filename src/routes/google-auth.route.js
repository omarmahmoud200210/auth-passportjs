import express from 'express';
import { googleCallback } from '../controllers/google-auth.controller.js';
import passport from 'passport';

const googleRouter = express.Router();

googleRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

googleRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  googleCallback
);

export default googleRouter;
