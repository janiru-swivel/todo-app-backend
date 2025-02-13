import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controller/todoController.js";

const router = express.Router();

router.use(verifyToken);

router.post("/todo", createTodo);
router.get("/todos", getAllTodos);
router.get("/todo/:id", getTodoById);
router.put("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

export default router;
