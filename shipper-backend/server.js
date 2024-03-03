const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const { initializeSequelize } = require("./src/configuration/dbconfig");
const authroute = require("./src/routes/authroute");
const formroute = require("./src/routes/formroute");
const app = express();
const PORT = process.env.PORT || 5000;

initializeSequelize();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authroute);
app.use("/create", formroute);

app.listen(PORT, () => {
  console.log(`Express is running on port ${PORT}`);
});
