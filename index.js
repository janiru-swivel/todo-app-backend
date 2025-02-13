import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import todoRoute from "./routes/todoRoute.js";
import authRoute from "./routes/authRoute.js";
import Logger from "./config/logger.js";

const app = express();

// Configure environment variables
dotenv.config();

// Load Swagger document
const swaggerDocument = YAML.load("./swagger.yaml");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Add HTTP request logging middleware
app.use((req, res, next) => {
  Logger.http(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Routes
app.use("/api/auth", authRoute);
app.use("/api", todoRoute);

// MongoDB connection and server startup
mongoose
  .connect(MONGOURL)
  .then(() => {
    Logger.info("MongoDB connected successfully");
    app.listen(PORT, () => {
      Logger.info(`Server started on port ${PORT}`);
      Logger.info(
        `API Documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((error) => {
    Logger.error("Failed to connect to MongoDB", { error: error.message });
    process.exit(1);
  });

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  Logger.error("Uncaught Exception", { error: error.message });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  Logger.error("Unhandled Promise Rejection", { error: error.message });
  process.exit(1);
});

export default app;
