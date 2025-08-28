import express from "express";
import adminControllers from "../controllers/adminController.mjs";

const PrivateRouter = express.Router();
const adminController = new adminControllers();
// Admin register routes
PrivateRouter.post(
  "/api/register",
  adminController.validateRegister, // Tambahkan middleware validasi
  adminController.createAdmin
);

export default PrivateRouter;
