import express from "express";
import adminController from "../controllers/adminController.js";

const router = express.Router();

// Example admin controller (replace with your actual controller)

// Admin dashboard route
router.get("/dashboard", adminController.dashboard);

// Add more admin routes as needed
// router.post("/add-product", adminController.addProduct);
// router.delete("/delete-user/:id", adminController.deleteUser);

export default router;
