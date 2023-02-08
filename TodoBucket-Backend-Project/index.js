require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { explorerRoutes } = require("./routes/explorer.routes");
const connectDB = require("./configs/db.config");

const PORT = process.env.PORT || 8000;

const app = express();

// use middlewares
app.use(express.json());
app.use(cors());
app.use((req, _, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    return next();
});

// use routes
app.use("/api/auth/explorer", explorerRoutes);
app.use("/api/explorer", explorerRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`The server listening on port ${PORT}`);
});