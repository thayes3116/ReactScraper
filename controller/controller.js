      // Requiring comment and article models

var Article = require("../model/article.js");


var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

router.get("/api/saved", function(req, res) {

   Article.find({}).sort([
    ["date", "descending"]
  	]).limit(6).exec(function(err, doc) {
   
    if (err) throw err

    else {
      res.send(doc);
    }

  });
});

router.post("api/saved", function(req, res) {


  console.log("BODY: " + req.body.title);

  
  Article.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url
  }, function(err) {
    if (err) throw err;

    else {
      res.send("Saved Search");
    }
  });
});

router.post("api/saved/delete", function(req, res) {
  if (err) throw err;
})

// Export routes for server.js to use.
module.exports = router;