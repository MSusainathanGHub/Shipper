const jwt = require("jsonwebtoken");
 const { body, validationResult } = require("express-validator");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");
const { Sequelize } = require("sequelize");
 
 const authregistration = async (req, res, next) => {
  try {
     await Promise.all([
      body("email").isEmail().withMessage("Invalid email address").run(req),
      body("password")
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Password cannot be empty")
        .run(req),
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username,email, password, role } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Create a new user
    const newUser = await User.create({ username, email, password, role });

    // Omit the password field from the response for security reasons
    const userWithoutPassword = { ...newUser.dataValues, password: undefined };

    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
     res.status(500).json({ error: "Internal Server Error" });
  }
};

 


const loginservice = async (req, res) => {
  const payload= req.body;
   try {
    const email = payload.email;
    const foundUser = await User.findOne({
      where: { email: email },
    });

    if (!foundUser) {
      return res.status(404).send({
        success: false,
        msg: "Sorry, email of user is not correct",
      });
    }
    const secret = process.env.JWT_SECRET;
    const cryptr = new Cryptr(secret, {
      pbkdf2Iterations: 10000,
      saltLength: 10,
    });

    const decryptedString = cryptr.decrypt(foundUser.password);

    const isMatch = payload.password === decryptedString ? true : false;

    if (isMatch) {
      const secret = process.env.JWT_SECRET ;
      const token = jwt.sign({ userId: foundUser.user_id, user:foundUser }, secret, {
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      return res.status(200).send({
        id: foundUser.user_id,
        username: foundUser.username,
        roles: foundUser.role,
        accessToken: token,
      });
    } else {
      return res.status(404).send({
        success: false,
        msg: "Sorry, Password is not correct",
      });
    }
  } catch (error) {
    throw error;
  }
};

async function updatePassword(req, res, next) {
  const employeeId = req.user.id;
  const newPassword = req?.body?.password
  try {
 
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.update(
      { password: hashedPassword },
      { where: { user_id: employeeId } }
    );
    if (updatedUser[0] === 0) {
      throw new Error("User not found or password not updated.");
    }
    else{
      res.json(
        "updated successfully" 
       )
    }
   
   } catch (error) {
     return { success: false, message: "Error updating password." };
  }
}

const getUserDetails = async (req, res, next) => {
  try {
    const employeename = req.user.username;
    const users = await User.findOne({ where: { username: employeename } });
    if (users) {
      res.json({
        status: 200,
        data: users,
      });
    } else {
      res.json({
        status: 404,
        message: "User not found",
      });
    }
  } catch (error) {
     res.status(500).json({ error: "Internal Server Error" });
  }
};


const createEmployee = async (req, res, next) => {
   try {
    const data = req.body; 
    const updatedata = { ...data, createdBy: req?.user?.user_id };
    const newEmployee = await User.create(updatedata);
    if (newEmployee) {
      res.json({
        status: 201,
      });
    }
  } catch (error) {
     next(error);
  }
};

const updateEmployeeById = async (req, res, next) => {
  try {
    const data = req.body;
    const updatedata = { ...data, modified_by: req?.user?.name };
    const empupdate = await Employee.update(updatedata, {
      where: { user_id: req.params.id },
    });
    if (empupdate?.length) {
      return res.json(200);
    } else {
      throw new Error("Employee not found or not updated.");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
    next(error);
  }
};


const deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    await employee.destroy();
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
    next(err);
  }
};

const getAllEmployeeDetails = async (req, res, next) => {
  try {
    const adminid=req.user;
      const employees = await User.findAll({
      where: {
        role: {
          [Sequelize.Op.ne]: "ADMIN",
        },

      },
    });

    res.json(employees);
  } catch (err) {
     console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
    next(err);
  }
};
const getEmployeeById = async (req, res, next) => {
  const userid = req.params.id;

  try {
    const employees = await Employee.findOne({
      where: {
        user_id: userid,
      },
    });

    res.json(employees);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ error: "Internal server error" });
    next(err);
  }
};

module.exports = {
  authregistration,
  getAllEmployeeDetails,
  getUserDetails,
  loginservice,
  updatePassword,
  createEmployee,
  updateEmployeeById,
  deleteEmployee,
  getEmployeeById
};