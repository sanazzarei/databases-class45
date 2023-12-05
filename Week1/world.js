const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world", 
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

connection.query(
  "SELECT Name FROM country WHERE Population > 8000000",
  (err, results) => {
    if (err) throw err;
    console.log("1. Countries with population greater than 8 million:");
    console.log(results);
  }
);

connection.query(
  'SELECT Name FROM country WHERE Name LIKE "%land%"',
  (err, results) => {
    if (err) throw err;
    console.log('2. Countries with "land" in their names:');
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000",
  (err, results) => {
    if (err) throw err;
    console.log("3. Cities with population between 500,000 and 1 million:");
    console.log(results);
  }
);

connection.query(
  'SELECT Name FROM country WHERE Continent = "Europe"',
  (err, results) => {
    if (err) throw err;
    console.log("4. Countries in Europe:");
    console.log(results);
  }
);

connection.query(
  "SELECT Name FROM country ORDER BY SurfaceArea DESC",
  (err, results) => {
    if (err) throw err;
    console.log("5. Countries in descending order of surface area:");
    console.log(results);
  }
);

connection.query(
  'SELECT Name FROM city WHERE CountryCode = "NLD"',
  (err, results) => {
    if (err) throw err;
    console.log("6. Cities in the Netherlands:");
    console.log(results);
  }
);

connection.query(
  'SELECT Population FROM city WHERE Name = "Rotterdam"',
  (err, results) => {
    if (err) throw err;
    console.log("7. Population of Rotterdam:");
    console.log(results);
  }
);

connection.end((err) => {
  if (err) {
    console.error("Error closing the connection:", err);
    return;
  }
  console.log("MySQL connection closed");
});
