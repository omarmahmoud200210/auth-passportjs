import express from "express";
import {
    renderForgetPasswordPage,
    handelForgetPassword
} from "../controllers/forget-password.controller.js";

const forgetRouter = express.Router();

forgetRouter.get('/', renderForgetPasswordPage);
forgetRouter.post('/', handelForgetPassword);

export default forgetRouter;
