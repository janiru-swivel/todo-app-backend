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

/**
 * @swagger
 * /todo:
 *   post:
 *     summary: Create a new todo
 */
route.post("/todo", createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 */
route.get("/todos", getAllTodos);

/**
 * @swagger
 * /todo/{id}:
 *   get:
 *     summary: Get a todo by ID
 */
route.get("/todo/:id", getTodoById);

/**
 * @swagger
 * /todo/{id}:
 *   put:
 *     summary: Update a todo
 */
route.put("/todo/:id", updateTodo);

/**
 * @swagger
 * /todo/toggle/{id}:
 *   patch:
 *     summary: Toggle todo completion status
 */
route.patch("/todo/toggle/:id", toggleTodoStatus);

/**
 * @swagger
 * /todo/{id}:
 *   delete:
 *     summary: Delete a todo
 */
route.delete("/todo/:id", deleteTodo);

export default route;
