import Todo from "../models/todoModel.js";


export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title || !dueDate) {
      return res.status(400).json({ message: "Please provide both title and due date" });
    }

    const todo = await Todo.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error("Create Todo Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    res.status(200).json(todo);
  } catch (error) {
    console.error("Get Todo Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.user.id)
      return res.status(401).json({ message: "Not authorized" });

    await todo.deleteOne();
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
