import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  toggleTodoStatus,
} from "../controller/todoController.js";

const route = express.Router();

route.post("/todo", createTodo);
route.get("/todos", getAllTodos);
route.get("/todo/:id", getTodoById);
route.put("/todo/:id", updateTodo);
route.patch("/todo/toggle/:id", toggleTodoStatus);
route.delete("/todo/:id", deleteTodo);

export default route;
