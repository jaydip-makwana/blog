import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import path from "path";
import isUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create the multer instance
const upload = multer({ dest: "./upload" });

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// Protected routes

router.get("/blog", isUserAuthenticated, BlogController.getAllBlog);
router.post(
  "/blog",
  isUserAuthenticated,
  upload.single("file"),
  BlogController.addBlog
);
router.get("/blog/:id", isUserAuthenticated, BlogController.getById);

router.get("/category", isUserAuthenticated, CategoryController.getAllCategory);
router.post("/category", isUserAuthenticated, CategoryController.addCategory);

export default router;
