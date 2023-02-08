const TodoModel = require('../models/todo.model');

exports.updateTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const todo = await TodoModel.findByIdAndUpdate({ _id }, req.body, { returnDocument: 'after' });
        return res.status(200).json({ status: 'success', message: 'Todo updated successfully.', doc: todo });
    } catch (error) {
        switch (error.code) {
            default:
                return res.status(400).json({ status: 'error', message: `${error.message}` }); F
        }
    }
};