require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

exports.authenticator = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser) return res.status(401).json({ status: "warning", message: "User does not exist! Please register yourself!" });
        const checkPassword = bcrypt.compareSync(password, oldUser.password);
        if (!checkPassword) return res.status(401).json({ status: "warning", message: "Wrong credentials!" });
        req._id = oldUser._id;
        req.role = oldUser.role;
        return next();
    } catch (error) {
        switch (error) {
            case "":
            default:
                return res.status(400).json({ status: "error", message: `Unknown error: ${error}` });
        }
    }
};