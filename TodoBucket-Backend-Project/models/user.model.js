const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String }
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;