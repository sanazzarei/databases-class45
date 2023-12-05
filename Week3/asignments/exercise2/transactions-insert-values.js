const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "trans_database",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database.");

  const insertValuesQuery = `
    INSERT INTO account (account_number, balance)
    VALUES
      (101, 5000.00),
      (102, 3000.00);

    INSERT INTO account_changes (account_number, amount, remark)
    VALUES
      (101, -1000.00, 'Transfer to account 102'),
      (102, 1000.00, 'Transfer from account 101');
  `;

  connection.query(insertValuesQuery, (error, results) => {
    if (error) throw error;
    console.log("data inserted successfully.");
    connection.end();
  });
});
