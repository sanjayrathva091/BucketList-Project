const TodoModel = require("../models/todo.model");


exports.fetchTodos = async (req, res) => {
    try {
        const searchQuery = { _ownerId: req._ownerId };
        const todos = await TodoModel.find(searchQuery);
        return res.status(200).json({ status: 'success', message: "Your todos have been fetched successfully!", docs: todos });
    } catch (error) {
        switch (error) {
            case "":
            default:
                return res.status(400).json({ status: 'error', message: `Unknown error: ${error}` });
        }
    }
};