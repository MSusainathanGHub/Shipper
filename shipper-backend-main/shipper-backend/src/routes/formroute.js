const express = require("express");
const { createDynamicform, getAllModules, deleteModule, getModuleforUser, insertData, getValueFromTable } = require("../services/FormController");
const { authenticateToken } = require("../middleware/middleware");

const formroute = express.Router();

formroute.post("/module", createDynamicform);
formroute.get("/viewmodule", getAllModules);

formroute.get("/viewModuleforuser",authenticateToken, getModuleforUser);
formroute.post("/insertData",authenticateToken, insertData);
formroute.get("/getTabledata/:tablename",authenticateToken,getValueFromTable)
formroute.delete("/deletemodule/:tablename", deleteModule);

module.exports = formroute;
