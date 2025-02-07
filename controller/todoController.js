import Todo from "../model/todoModel.js";

export const createTodo = async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    res
      .status(201)
      .json({ message: "Todo created successfully.", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found." });
    }
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      return res.status(404).json({ message: "Todo not found." });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Todo updated successfully.", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const toggleTodoStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found." });
    }
    todo.completed = !todo.completed;
    await todo.save();
    res
      .status(200)
      .json({ message: "Todo status toggled successfully.", todo });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const todoExists = await Todo.findById(id);
    if (!todoExists) {
      return res.status(404).json({ message: "Todo not found." });
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
