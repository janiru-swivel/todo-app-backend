import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
} from "../controller/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", verifyToken, logout);

export default router;
