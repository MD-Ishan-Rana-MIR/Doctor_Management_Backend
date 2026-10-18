const express = require("express");
const { createPatient } = require("../controller/admin/patientController");
const { isLogIn, isAdmin } = require("../middleware/auth.middleware");

const patientRouter = express.Router();

patientRouter.post("/create-patient", isLogIn, isAdmin, createPatient)




module.exports = patientRouter;