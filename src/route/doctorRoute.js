const express = require("express");
const { createDoctor, getDoctors } = require("../controller/admin/doctorController");
const { isLogIn, isAdmin } = require("../middleware/auth.middleware");

const doctorRouter = express.Router();

doctorRouter.post("/create-doctor", isLogIn, isAdmin ,createDoctor);
doctorRouter.get("/all-doctor",isLogIn,isAdmin,getDoctors);

module.exports = doctorRouter;