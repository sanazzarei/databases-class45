const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: trans_database,
});

connection.beginTransaction((err) => {
  if (err) throw err;
  console.log("Transaction started.");

  const transferQuery = `
    UPDATE account SET balance = balance - 1000 WHERE account_number = 101;
    UPDATE account SET balance = balance + 1000 WHERE account_number = 102;
    INSERT INTO account_changes (account_number, amount, remark)
    VALUES (101, -1000, 'Transfer to account 102'),
           (102, 1000, 'Transfer from account 101');
  `;

  connection.query(transferQuery, (error, results) => {
    if (err) {
      return connection.rollback(() => {
        throw err;
      });
    }

    connection.commit((err) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }
      console.log("Transaction Complete.");
      connection.end();
    });
  });
});
