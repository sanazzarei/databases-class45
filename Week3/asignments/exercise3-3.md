### injection can happen if we have
SELECT Population FROM Country WHERE Name = 'CA' OR 'c' = 'c' and code = '12' OR 1 = 1


### new function:
``
function getPopulationSafe(conn, Country, name, code, cb) {
  conn.query(
    'SELECT Population FROM ?? WHERE Name = ? AND code = ?',
    [Country, name, code],
    function (err, result) {
      if (err) return cb(err);
      if (result.length === 0) return cb(new Error('Not found'));
      cb(null, result[0].Population);
    }
  );
}
``