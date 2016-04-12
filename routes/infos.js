import express from 'express';
var router = express.Router();


let obj = {
  "name": "Leon",
  "pobox": "PO Box 36393,",
  "district": "Northcote 0748,",
  "city": "Auckland,",
  "country": "New Zealand",
  "phone": "021 202 335",
  "email": "nzgezilin@gmail.com",
  "logo": "/images/logo.png",
  "wechat": "/images/weixin.jpg",
  "url":"#",
  "display":"facebook"
};

/* GET users listing. */
router.route('/infos')
  .get(function(req, res, next) {

  var mysql  = require('mysql');
  var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lynn'
  });
  connection.connect();
  let result = {};
  connection.query(`SELECT * FROM infos`, function(err,rows) {
    if (!err)
      result.infos = Object.assign(rows[0],obj)
      console.log(result);
    res.jsonp(result);
  });
    connection.end();

    }).post(function(req,res,next) {

    var mysql  = require('mysql');
    var connection = mysql.createConnection({
      multipleStatements: true,
      host     : 'localhost',
      port     : 3306,
      user     : 'root',
      password : 'root',
      database : 'lynn'
    });
    connection.connect();
      let info = req.body;
      console.log(info);
    let sql = `INSERT INTO lynn.infos SET name = "${info.name}", pobox = "${info.pobox}", district ="${info.district}", city = "${info.city}", country = "${info.country}", phone = "${info.phone}", email = "${info.email}", logo = "${info.logo}", wechat = "${info.wechat}", url = "${info.url}", display = "${info.display}"`

      connection.query(sql, function(err, rows) {
        if (!err)
      res.json({ message: 'Successfully created'});
    });
    connection.end();
  });


router.route('/infos/:id')
      .put(function(req,res,next) {

  var mysql  = require('mysql');
  var connection = mysql.createConnection({
    multipleStatements: true,
    host     : 'localhost',
    port     : 3306,
    user     : 'root',
    password : 'root',
    database : 'lynn'
  });
  connection.connect();
        let info = req.body;
        console.log(info);
        let sql = `UPDATE lynn.infos SET name = "${info.name}", pobox = "${info.pobox}", district ="${info.district}", city = "${info.city}", country = "${info.country}", phone = "${info.phone}", email = "${info.email}", logo = "${info.logo}", wechat = "${info.wechat}", url = "${info.url}", display = "${info.display}" WHERE id = "${req.params.id}"`

        connection.query(sql, function(err, rows) {
          if (!err)
            console.log(info);
    res.json({message: "Successfully updated"});
  });
  connection.end();

      }).delete(function(req,res,next) {

        var mysql  = require('mysql');
        var connection = mysql.createConnection({
          multipleStatements: true,
          host     : 'localhost',
          port     : 3306,
          user     : 'root',
          password : 'root',
          database : 'lynn'
        });
        connection.connect();
        let sql = `DELETE FROM lynn.infos WHERE id = "${req.params.id}"`
        connection.query(sql, function(err, rows) {
          if (!err)
          res.json({ message: 'Successfully deleted' });
        });
        connection.end();
      }).get(function(req,res,next) {
        var mysql  = require('mysql');
        var connection = mysql.createConnection({
          multipleStatements: true,
          host     : 'localhost',
          port     : 3306,
          user     : 'root',
          password : 'root',
          database : 'lynn'
        });
        connection.connect();
        let sql = `SELECT * FROM lynn.infos WHERE id = "${req.params.id}"`
        connection.query(sql,function(err,rows){
          if (!err)
          res.json(rows);
        });
        connection.end();
      });

module.exports = router;
