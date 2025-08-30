import express from "express";
import adminControllers from "../controllers/adminControllers.mjs";

const PrivateRouter = express.Router();
const adminController = new adminControllers();

PrivateRouter.post(
  "/api/register",
  adminController.validateRegister,
  adminController.createAdmin
);

export default PrivateRouter;
