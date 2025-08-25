import express from "express";
import adminController from "../controllers/adminController.mjs";

const router = express.Router();
const adminController = new adminController();
// Admin register routes
router.post(
  "/register",
  adminController.validateRegister, // Tambahkan middleware validasi
  adminController.createAdmin
);

export default router;
