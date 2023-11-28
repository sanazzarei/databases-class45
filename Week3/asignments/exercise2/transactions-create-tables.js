const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  const createTablesQuery = `
  DROP DATABASE IF EXISTS trans_database;
  CREATE DATABASE trans_database;
  USE trans_database;

    CREATE TABLE account (
      account_number INT PRIMARY KEY,
      balance DECIMAL(10, 2)
    );

    CREATE TABLE account_changes (
      change_number INT AUTO_INCREMENT PRIMARY KEY,
      account_number INT,
      amount DECIMAL(10, 2),
      changed_date DATE DEFAULT CURRENT_DATE,
      remark VARCHAR(255),
      FOREIGN KEY (account_number) REFERENCES account(account_number)
    );
  `;

  connection.query(createTablesQuery, (error, results) => {
    if (error) throw error;
    console.log("Tables created successfully.");
    connection.end();
  });
});
