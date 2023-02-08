const TodoModel = require('../models/todo.model');

exports.deleteTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const todo = await TodoModel.findByIdAndDelete({ _id }, { returnDocument: 'after' });
        return res.status(200).json({ status: 'success', message: 'Todo deleted successfully.', doc: todo });
    } catch (error) {
        switch (error.code) {
            default:
                return res.status(400).json({ status: 'error', message: `${error.message}` }); F
        }
    }
};