import express from "express";
import customerControllers from "../controllers/customerController.mjs";
import upload from "../middlewares/upload.mjs";
const PublicRouter = express.Router();

PublicRouter.post(
  "/api/register-customer",
  upload.single("image"),
  customerControllers.register
);

export default PublicRouter;
