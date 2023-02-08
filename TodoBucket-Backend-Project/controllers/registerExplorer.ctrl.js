require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");

const registerExplorer = async (req, res) => {
    try {
        let { firstName, lastName, email, password } = req.body;
        const oldUser = await UserModel.findOne({ email });
        if (oldUser) return res.status(409).json({ status: "warning", message: "User already exists!" });
        const saltOrRounds = Math.floor((Math.random * 3) + 8);
        password = bcrypt.hashSync(password, saltOrRounds);
        const newExplorer = new UserModel({ firstName, lastName, email, password, role: 'Explorer' });
        newExplorer.validateSync();
        const saved = await newExplorer.save();
        return res.status(201).json({ status: "success", message: "Registration successfully completed!", doc: saved });

    } catch (error) {
        switch (error.code) {
            case 11000:
                return res.status(409).json({ status: "warning", message: "User already exists!" })
            default:
                return res.status(400).json({ message: `Unknown error: ${error.message}` });
        }
    }
};

module.exports = { registerExplorer };