import { handleLogout } from "../controllers/logout.controller.js";
import express from "express";

const logoutRouter = express.Router();

logoutRouter.get('/', handleLogout);

export default logoutRouter;