const { DataTypes } = require("sequelize");
 const Cryptr = require('cryptr');

const dotenv = require("dotenv");
const {sequelizeConnection,sequelize} = require("../configuration/dbconfig");
dotenv.config();

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    schemaName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM({
        values: ["USER", "ADMIN","SUPERADMIN"],
      }),
      allowNull: false,
    },
    deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize: sequelizeConnection,
    paranoid: true,

    hooks: {
      beforeCreate: async (user) => {
        console.log("user",user)
        if (user.password) {
          const secret = process.env.JWT_SECRET;
          console.log("secret",secret)
          const cryptr = new Cryptr(secret, {
            pbkdf2Iterations: 10000,
            saltLength: 10,
          });
          user.password = cryptr.encrypt(user.password);
        }
      },
      beforeUpdate: async (user) => {
        if (user?.password) {
          const secret = process.env.JWT_SECRET;
          const cryptr = new Cryptr(secret, {
            pbkdf2Iterations: 10000,
            saltLength: 10,
          });
          user.password = cryptr.encrypt(user.password);
        }
      },

     
      
    },
  }
);


module.exports = User;
