const Employee = require("../../models/employee");
const jwt = require("jsonwebtoken"); //used to generate the token

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

//controller for emloyees login
module.exports.createSession = async function (req, res) {
  try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (!employee || employee.password != req.body.password) {
      return res.status(422).json({
        message: "Invalid username/password",
      });
    }

    return res.status(200).json({
      message: "Signed in successful, here is your token,please keep it safe",
      data: {
        token: jwt.sign(employee.toJSON(), "secret", { expiresIn: "1000000" }),
      },
    });
  } catch (err) {
    console.log("employee create session error", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//fetch all employees
module.exports.fetchAllEmployes = async function (req, res) {
  try {
    let employees = await Employee.find({});
    return res.status(200).json({
      message: "All Employees",
      data: {
        employees: employees,
      },
    });
  } catch (err) {
    console.log("fetch all employees error", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//update employee profile
module.exports.updateProfile = async function (req, res) {
  try {
    if (req.body) {
      await Employee.findByIdAndUpdate(req.user._id, req.body);
    }
    return res.status(200).json({
      message: "Profile Updated",
    });
  } catch (err) {
    console.log("update employee profile error", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//delete employee from DB
module.exports.deleteEmployee = async function (req, res) {
  try {
    await Employee.findByIdAndDelete(req.user._id);
    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (err) {
    console.log("delete employee error", err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
