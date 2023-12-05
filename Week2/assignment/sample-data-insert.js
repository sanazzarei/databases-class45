const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
  database: "authors",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  const insertQueries = `
    INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
    VALUES
      ('John Doe', 'University A', '1980-05-15', 10, 'male', NULL),
      ('Jane Smith', 'University B', '1992-11-20', 8, 'female', 1),
      ('Alice Johnson', 'University A', '1985-08-10', 12, 'female', NULL),
      ('Bob Brown', 'University C', '1975-03-25', 15, 'male', 1);

    INSERT INTO research_papers (paper_id, paper_title, conference, publish_date)
    VALUES
      (1, 'Paper 1', 'Conference X', '2022-01-10'),
      (2, 'Paper 2', 'Conference Y', '2022-02-20'),
      (3, 'Paper 3', 'Conference Z', '2022-03-15');

    INSERT INTO author_papers (author_id, paper_id)
    VALUES
      (1, 1),
      (2, 2),
      (3, 3),
      (4, 1),
      (4, 2);
  `;

  connection.query(insertQueries, (error, results, fields) => {
    if (error) throw error;
    console.log("Data inserted successfully", results);
    connection.end();
  });
});
