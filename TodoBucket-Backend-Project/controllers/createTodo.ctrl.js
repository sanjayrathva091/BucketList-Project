const TodoModel = require("../models/todo.model");


exports.createTodo = async (req, res) => {
    try {
        const currentTodo = { ...req.body, _ownerId: req._ownerId };
        const newTodo = new TodoModel(currentTodo);
        newTodo.validateSync();
        const saved = await newTodo.save();
        return res.status(201).json({ status: 'success', message: "Todo added successfully!", doc: saved });
    } catch (error) {
        switch (error) {
            case "value":
            default:
                return res.status(400).json({ status: 'error', message: `Unknown error: ${error}` });
        }
    }
};