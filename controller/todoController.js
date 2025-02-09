import Todo from "../model/todoModel.js";
import Logger from "../config/logger.js";

export const createTodo = async (req, res) => {
  try {
    Logger.info("Creating new todo", { title: req.body.title });
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    Logger.info("Todo created successfully", { id: savedTodo._id });
    res
      .status(201)
      .json({ message: "Todo created successfully.", todo: savedTodo });
  } catch (error) {
    Logger.error("Error creating todo", { error: error.message });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    Logger.info("Fetching all todos");
    const todos = await Todo.find().sort({ createdAt: -1 });
    if (!todos || todos.length === 0) {
      Logger.warn("No todos found");
      return res.status(404).json({ message: "No todos found." });
    }
    Logger.info(`Retrieved ${todos.length} todos`);
    res.status(200).json(todos);
  } catch (error) {
    Logger.error("Error fetching todos", { error: error.message });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Fetching todo by id", { id });
    const todo = await Todo.findById(id);
    if (!todo) {
      Logger.warn("Todo not found", { id });
      return res.status(404).json({ message: "Todo not found." });
    }
    Logger.info("Todo retrieved successfully", { id });
    res.status(200).json(todo);
  } catch (error) {
    Logger.error("Error fetching todo", {
      id: req.params.id,
      error: error.message,
    });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Updating todo", { id });
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      Logger.warn("Todo not found for update", { id });
      return res.status(404).json({ message: "Todo not found." });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    Logger.info("Todo updated successfully", { id });
    res
      .status(200)
      .json({ message: "Todo updated successfully.", todo: updatedTodo });
  } catch (error) {
    Logger.error("Error updating todo", {
      id: req.params.id,
      error: error.message,
    });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const toggleTodoStatus = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Toggling todo status", { id });
    const todo = await Todo.findById(id);
    if (!todo) {
      Logger.warn("Todo not found for status toggle", { id });
      return res.status(404).json({ message: "Todo not found." });
    }
    todo.completed = !todo.completed;
    await todo.save();
    Logger.info("Todo status toggled successfully", {
      id,
      completed: todo.completed,
    });
    res
      .status(200)
      .json({ message: "Todo status toggled successfully.", todo });
  } catch (error) {
    Logger.error("Error toggling todo status", {
      id: req.params.id,
      error: error.message,
    });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Deleting todo", { id });
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      Logger.warn("Todo not found for deletion", { id });
      return res.status(404).json({ message: "Todo not found." });
    }
    await Todo.findByIdAndDelete(id);
    Logger.info("Todo deleted successfully", { id });
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    Logger.error("Error deleting todo", {
      id: req.params.id,
      error: error.message,
    });
    res.status(500).json({ errorMessage: error.message });
  }
};
