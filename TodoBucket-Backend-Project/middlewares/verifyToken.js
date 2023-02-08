require("dotenv").config();
const JwT = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) return res.status(403).json({ status: 'warning', message: 'Login required!' });
        const accessToken = bearerToken.split(" ")[1];
        if (accessToken === null) return res.status(403).json({ status: 'warning', message: 'Login required!' });
        const PrivateKey = process.env.PRIVATE_KEY;
        const decodedToken = JwT.verify(accessToken, PrivateKey);
        switch (decodedToken.role) {
            case "Explorer":
                if (req.method === "POST" && req.url === "/create/todo") {
                    req._ownerId = decodedToken._id;
                    return next();
                }
                if (req.method === "GET" || req.method === 'PATCH' || req.method === 'DELETE') {
                    req._ownerId = decodedToken._id;
                    return next();
                }
            default:
                return res.status(403).json({ status: "warning", message: `${decodedToken.role} not authorized` });
        }
    } catch (error) {
        switch (error.name) {
            case "TokenExpiredError":
                return res.status(403).json({ status: 'warning', message: `Session expired!`, error: `${error.message}` })
            case "JsonWebTokenError":
                return res.status(403).json({ status: "warning", message: `Login required!`, error: `${error.message}` });
            default:
                return res.status(400).json({ status: "warning", message: `Unkown error: ${error}`, error });
        }

    }
};