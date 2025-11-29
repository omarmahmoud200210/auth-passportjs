import express from "express";
import {
    handleResetPassword,
    renderResetPasswordPage
} from "../controllers/reset-password.controller.js";

const resetRouter = express.Router();

resetRouter.get('/', renderResetPasswordPage);
resetRouter.post('/', handleResetPassword);

export default resetRouter;
