import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { AUTH_CONFIG } from "../config/auth.config.js";
import Logger from "../config/logger.js";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, AUTH_CONFIG.jwtSecret, {
    expiresIn: AUTH_CONFIG.accessTokenExpiry,
  });

  const refreshToken = jwt.sign({ userId }, AUTH_CONFIG.jwtRefreshSecret, {
    expiresIn: AUTH_CONFIG.refreshTokenExpiry,
  });

  return { accessToken, refreshToken };
};

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ email, password });
    await user.save();

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    Logger.info("User registered successfully", { userId: user._id });
    res.status(201).json({
      message: "Registration successful",
      ...tokens,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    Logger.error("Registration error", { error: error.message });
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    Logger.info("User logged in successfully", { userId: user._id });
    res.json({
      message: "Login successful",
      ...tokens,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    Logger.error("Login error", { error: error.message });
    res.status(500).json({ message: "Login failed" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const decoded = jwt.verify(refreshToken, AUTH_CONFIG.jwtRefreshSecret);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const tokens = generateTokens(user._id);
    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.json({
      message: "Token refresh successful",
      ...tokens,
    });
  } catch (error) {
    Logger.error("Token refresh error", { error: error.message });
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    Logger.info("User logged out successfully", { userId: req.user._id });
    res.json({ message: "Logout successful" });
  } catch (error) {
    Logger.error("Logout error", { error: error.message });
    res.status(500).json({ message: "Logout failed" });
  }
};
