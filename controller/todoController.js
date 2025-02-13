import Todo from "../model/todoModel.js";
import Logger from "../config/logger.js";

export const createTodo = async (req, res) => {
  try {
    Logger.info("Creating new todo", { title: req.body.title });
    const newTodo = new Todo({
      ...req.body,
      user: req.user._id,
    });
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
    Logger.info("Fetching todos for user", { userId: req.user._id });
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    if (!todos || todos.length === 0) {
      Logger.warn("No todos found for user", { userId: req.user._id });
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
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (!todo) {
      Logger.warn("Todo not found", { id });
      return res.status(404).json({ message: "Todo not found." });
    }
    Logger.info("Todo retrieved successfully", { id });
    res.status(200).json(todo);
  } catch (error) {
    Logger.error("Error fetching todo", { error: error.message });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Updating todo", { id });
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (!todo) {
      Logger.warn("Todo not found for update", { id });
      return res.status(404).json({ message: "Todo not found." });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { ...req.body, user: req.user._id },
      { new: true }
    );

    Logger.info("Todo updated successfully", { id });
    res
      .status(200)
      .json({ message: "Todo updated successfully.", todo: updatedTodo });
  } catch (error) {
    Logger.error("Error updating todo", { error: error.message });
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    Logger.info("Deleting todo", { id });
    const todo = await Todo.findOne({ _id: id, user: req.user._id });
    if (!todo) {
      Logger.warn("Todo not found for deletion", { id });
      return res.status(404).json({ message: "Todo not found." });
    }

    await Todo.findByIdAndDelete(id);
    Logger.info("Todo deleted successfully", { id });
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    Logger.error("Error deleting todo", { error: error.message });
    res.status(500).json({ errorMessage: error.message });
  }
};
