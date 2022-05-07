const express = require("express");

const router = express.Router();

const employeeController = require("../../controllers/api/employee_api"); //importing employee's controller

router.post("/register", employeeController.register); //all routes with '/register'

router.post("/login", employeeController.createSession); //all routes with '/login'

module.exports = router; //exporting router
