const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
 const dbPassword = process.env.DB_PASSWORD;
const dialect = process.env.DIALECT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
   host: dbHost,
  dialect: dialect,
  logging: false,
  operatorAlias: false,
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  sync: { force: false },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

async function initializeSequelize() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (error) {
    console.error("Error initializing Sequelize:", error);
  }
}

module.exports = { db, sequelize, initializeSequelize };
