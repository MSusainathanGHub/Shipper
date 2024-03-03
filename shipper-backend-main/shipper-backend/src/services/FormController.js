const { QueryTypes } = require("sequelize");
const { sequelize } = require("../configuration/dbconfig");
const dotenv = require("dotenv");
dotenv.config();

const createDynamicTable = async (tablename, columns, res) => {
  let sql = `CREATE TABLE IF NOT EXISTS ${tablename} (`;

  sql += `${tablename}_id INT AUTO_INCREMENT PRIMARY KEY,`;

  columns.forEach((column, index) => {
    sql += `${column.name} ${column.type}`;

    if (column.required) {
      sql += " NULL";
    } else {
      sql += " NOT NULL";
    }
    // if (column.unique) {
    //   sql += " UNIQUE";
    // }
    // if (column.defaultValue !== undefined) {
    //   sql += ` DEFAULT '${column.defaultValue}'`;
    // }
    // if (column.check) {
    //   sql += ` CHECK (${column.check})`;
    // }
    if (index < columns.length - 1) {
      sql += ", ";
    }
  });

  sql += ");";
  try {
    await sequelize.query(sql);
    res.status(200).send(`Module ${tablename} has been created successfully`);
  } catch (err) {
    console.error("Error creating table:", err);
    res.status(404).send({
      success: false,
      msg: err,
    });
  }
};

const createDynamicform = async (req, res) => {
  const payload = req.body;
  createDynamicTable(payload?.tablename, payload?.component, res);
};

const getAllModules = async (req, res) => {
  try {
    const query = `
      SELECT table_name, create_time, update_time
      FROM information_schema.tables
      WHERE table_schema = '${process.env.DB_NAME}';
          
      `;

    const tables = await sequelize.query(query);
    console.log("tables", tables)
    const tableNamesWithTimestamps = tables[0];
    const filtertable = tableNamesWithTimestamps?.filter(x => x.TABLE_NAME !== "users")
    res.status(200).json(filtertable);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getTableFields = async (tableName) => {
  const query = `
  SELECT column_name, data_type ,is_nullable
  FROM information_schema.columns
  WHERE table_schema = '${process.env.DB_NAME}' AND table_name = '${tableName}';
`;

  const [fields] = await sequelize.query(query);
  console.log("fields", fields)

  return fields.map(field => ({
    name: field.COLUMN_NAME,
    type: field.DATA_TYPE,
    isRequired: field.IS_NULLABLE
  }));
};


const insertData = async (req, res) => {
  const { tablename, data } = req.body;

  try {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const query = `
      INSERT INTO ${tablename} (${columns})
      VALUES (${placeholders});
    `;

    const values = Object.values(data);

    const result = await sequelize.query(query, {
      replacements: values,
      type: QueryTypes.INSERT
    });
    res.status(200).json("created");
    return result;
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error; // Throw the error to handle it outside
  }
};

const getValueFromTable = async (req, res) => {
  const tablename = req.params.tablename;
  try {
    const query = `
      SELECT *
      FROM ${tablename}
      `;

    // Execute the raw SQL query
    const [results] = await sequelize.query(query);
    res.status(200).json({ data: results });

  } catch (error) {
    console.error('Error retrieving value:', error);
  }
};


const getModuleforUser = async (req, res) => {
  try {
    const tableName = req.user.schemaName;

    // Retrieve table fields
    const fields = await getTableFields(tableName);

    // Generate form based on table fields
    // const formFields = fields.map(field => ({
    //   name: field.name,
    //   label: field.name, // You can customize labels based on field names
    //   type: field.type === 'boolean' ? 'checkbox' : 'text', // Example: Map boolean fields to checkboxes
    //  }));
    // Return the generated form fields
    res.status(200).json({ tablename: tableName, data: fields });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const deleteModule = async (req, res) => {
  const tablename = req.params.tablename;
  try {
    const query = `
        DROP TABLE ${tablename};
        `;
    const deleteres = await sequelize.query(query);

    if (deleteres) {
      res.status(200).json("deleted");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { insertData, getValueFromTable, getModuleforUser, createDynamicform, getAllModules, deleteModule };
