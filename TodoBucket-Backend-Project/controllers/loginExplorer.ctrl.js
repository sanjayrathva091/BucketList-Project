require("dotenv").config();
const JwT = require("jsonwebtoken");

exports.loginExplorer = async (req, res) => {
    try {
        const { email } = req.body;
        const { _id, role } = req;
        const PrivateKey = process.env.PRIVATE_KEY;
        const accessToken = JwT.sign({ _id, email, role }, PrivateKey, { expiresIn: "1h" });
        return res.status(200).json({ status: "success", message: "Login successful!", accessToken });
    } catch (error) {
        switch (error) {
            case "":
            default:
                return res.status(400).json({ status: "error", message: `Unknown error: ${error.message}` });
        }
    }
};