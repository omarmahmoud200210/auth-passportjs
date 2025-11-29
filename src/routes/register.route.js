import express from 'express';
import {
  renderRegister,
  handleRegisterUser,
} from '../controllers/register.controllers.js';

const registerRoute = express.Router();

registerRoute.get('/', renderRegister);
registerRoute.post('/', handleRegisterUser);

export default registerRoute;
