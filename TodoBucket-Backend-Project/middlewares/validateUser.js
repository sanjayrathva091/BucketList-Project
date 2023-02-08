
exports.validateUser = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) return res.status(401).json({ status: "warning", message: "Email is required!" });
    if (!password) return res.status(401).json({ status: "warning", message: "Password is required!" });

    if (email && password) {
        return next();
    } else {
        return res.status(400).json({ status: "warning", message: "ValidationError: Something went wrong!" });
    }

};