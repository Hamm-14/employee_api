const Employee = require("../../models/employee");
// const PatientReport = require("../../models/patientReport");

//controller for registering the employee in db
module.exports.register = async function (req, res) {
  try {
    let employee = await Employee.findOne({ email: req.body.email });
    //if employee already exist
    if (employee) {
      return res.status(200).json({
        message: "Employee already registered",
        data: {
          employee: employee,
        },
      });
    }
    if (
      req.body.email &&
      req.body.name &&
      req.body.password &&
      req.body.age &&
      req.body.department
    ) {
      await Employee.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        department: req.body.department,
      });

      return res.status(200).json({
        message: "Employee Registered Successfully",
      });
    }
    return res.status(422).json({
      message: "name,email,password,age,department is mandatory",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
