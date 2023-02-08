const TodoModel = require("../models/todo.model");

exports.fetchSingleTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const todo = await TodoModel.findOne({ _id });
        return res.status(200).json({ status: 'success', message: 'Single todo fetched successfully.', doc: todo });
    } catch (error) {
        switch (error) {
            default:
                return res.status(400).json({ status: 'error', message: `${error.message}` });
        }
    }
};