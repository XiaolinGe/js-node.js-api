import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/data', function(req, res, next) {

  var mysql  = require('mysql');
  var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lynn'
  });
  connection.connect();

  let sqls = [
    `SELECT * FROM lynn.menu`,
    `SELECT * FROM lynn.info`
  ].join(";");
  connection.query(sqls, function(err,rows) {
    if (!err)
      console.log(rows);
      res.json(rows);
  });
  connection.end();
});

module.exports = router;
