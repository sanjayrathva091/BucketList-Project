require("dotenv").config();
const express = require("express");
const explorerRoutes = express.Router();
const { createTodo } = require("../controllers/createTodo.ctrl");
const { fetchTodos } = require("../controllers/fetchTodos.ctrl");
const { fetchSingleTodo } = require("../controllers/fetchSingleTodo.ctrl");
const { loginExplorer } = require("../controllers/loginExplorer.ctrl");
const { registerExplorer } = require("../controllers/registerExplorer.ctrl");
const { updateTodo } = require("../controllers/updateTodo.ctrl");
const { deleteTodo } = require("../controllers/deleteTodo.ctrl");
const { authenticator } = require("../middlewares/authenticator");
const { validateUser } = require("../middlewares/validateUser");
const { verifyToken } = require("../middlewares/verifyToken");

explorerRoutes.post("/register", [validateUser], registerExplorer);
explorerRoutes.post("/login", [validateUser, authenticator], loginExplorer);
explorerRoutes.post("/create/todo", [verifyToken], createTodo);

explorerRoutes.get("/get/todos", [verifyToken], fetchTodos);
explorerRoutes.get("/get/todo/:_id", [verifyToken], fetchSingleTodo);

explorerRoutes.patch("/update/todo/:_id", [verifyToken], updateTodo);

explorerRoutes.delete("/delete/todo/:_id", [verifyToken], deleteTodo);

module.exports = { explorerRoutes };