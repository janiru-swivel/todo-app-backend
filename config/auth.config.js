import crypto from "crypto";

export const AUTH_CONFIG = {
  jwtSecret: process.env.JWT_SECRET || crypto.randomBytes(64).toString("hex"),
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || crypto.randomBytes(64).toString("hex"),
  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
};
