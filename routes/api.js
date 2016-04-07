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
    `SELECT * FROM infos`,
    `SELECT * FROM menus`,
    `SELECT * FROM languages`,
    `SELECT * FROM menus`,
    `SELECT * FROM portfolios`,
    `SELECT * FROM portfolios p where p.title in ('mekongBaby','jstea')`,
    `SELECT * FROM faqs`
  ].join(";");
  let result = {};
  let facebook = {};
  connection.query(sqls, function(err,rows) {
    if (!err)

    facebook.id = rows[3].length+1;
    facebook.url = rows[0][0].url;
    facebook.display = rows[0][0].display;

    result.infos = rows[0][0];
    result.menus = rows[1];
    result.languages = rows[2];
    result.footerMenus = rows[3].concat(facebook);
    result.portfolios = rows[4];
    result.services = rows[5];
    result.faqs = rows[6];

    console.log(result);
    res.jsonp(result);
  });
  connection.end();
});

module.exports = router;
