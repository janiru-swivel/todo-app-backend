import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import route from "./routes/todoRoute.js";

const app = express();

// Configure environment variables
dotenv.config();

// Load Swagger document
const swaggerDocument = YAML.load("./swagger.yaml");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Environment variables
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

// Routes
app.use("/api", route);

// MongoDB connection and server startup
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      console.log(
        `API Documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((error) => console.log(error));

export default app;
