var port = process.env.PORT || 7891;
const express = require("express"),
  //   moment = require("moment-timezone"),
  bodyParser = require("body-parser"),
  //   AWS = require("aws-sdk"),
  //   multer = require("multer");
  fs = require("fs");

const app = express();
app.use(bodyParser.json());

var mysql = require("mysql");

// sample queries
//'SELECT * FROM bible_api.t_asv WHERE id BETWEEN 01001001 AND 02001005'

app.get("/gen", (req, res) => {
  var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "bible_api"
  });
   //TODO - handle too big numbers
   var bookNumber = req.body.book;
   if (bookNumber < 10) {
     bookNumber = `0${bookNumber}`;
   }

   console.log(`book number is ${bookNumber}`);

   var chapterNumber = req.body.chapter;
   if (chapterNumber < 10) {
     chapterNumber = `00${chapterNumber}`;
   } else if (chapterNumber >= 10 && chapterNumber < 99) {
     chapterNumber = `0${chapterNumber}`;
   }

   console.log(`chapter number is ${chapterNumber}`);

   var verseNumber = req.body.verseNumber;

   var verseNumber = req.body.verse;
   if (verseNumber < 10) {
     verseNumber = `00${verseNumber}`;
   } else if (verseNumber >= 10 && verseNumber < 99) {
     verseNumber = `0${verseNumber}`;
   }

   console.log(`verse number is ${verseNumber}`);
  connection.connect();

  connection.query(
    `SELECT * FROM bible_api.t_asv WHERE id = ${bookNumber}${chapterNumber}${verseNumber}`,
    function(error, results, fields) {
      if (error) throw error;
      //results.map(res => console.log(res.t));
    //   console.log(req.body.book);
    //   console.log(req.body.chapter);
    //   console.log(req.body.verse);

     

      res.send(results[0].t);
      res.end();
    }
  );

  connection.end();
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, that doesn't exist.");
});
