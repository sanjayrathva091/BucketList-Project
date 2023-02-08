const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: { type: String },
    isCompleted: { type: Boolean },
    priority: { type: String },
    _ownerId: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' }
});

const TodoModel = mongoose.model('todo', TodoSchema);

module.exports = TodoModel;