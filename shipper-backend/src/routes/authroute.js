const express = require('express');
const { loginservice, authregistration, getUserDetails, createEmployee, getAllEmployeeDetails } = require('../services/AuthController');
const { authenticateToken, checkSuperAdmin } = require('../middleware/middleware');
  
const authroute = express.Router();

authroute.post("/login", loginservice);
authroute.post("/createuser", authregistration);
authroute.get("/getuserdetails", getUserDetails);

authroute.post('/addemployee',authenticateToken,checkSuperAdmin,createEmployee)
authroute.get('/viewemployee',authenticateToken,checkSuperAdmin,getAllEmployeeDetails)


module.exports =authroute 