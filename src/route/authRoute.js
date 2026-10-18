const express = require("express");
const { registration, login } = require("../controller/auth/authController");
const authRouter = express.Router();

authRouter.post("/registration", registration);
authRouter.post("/login", login);

module.exports = authRouter;