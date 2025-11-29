import handelRefreshToken from "../controllers/refresh.controller.js";
import express from "express";

const refreshRouter = express.Router();

refreshRouter.post('/', handelRefreshToken);

export default refreshRouter;
