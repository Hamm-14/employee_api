const express = require("express");

const passport = require("passport"); //using passport for authenticate

const router = express.Router();

const employeeController = require("../../controllers/api/employee_api"); //importing employee's controller

router.post("/register", employeeController.register); //all routes with '/register'

router.post("/login", employeeController.createSession); //all routes with '/login'

router.get(
  "/all_employees",
  passport.authenticate("jwt", { session: false }), //fetching all employees only if employee is logged in
  employeeController.fetchAllEmployes
);

router.patch(
  "/update_profile",
  passport.authenticate("jwt", { session: false }), //update the logged-in employee profile
  employeeController.updateProfile
);

router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  employeeController.deleteEmployee
);

module.exports = router; //exporting router
