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
  	]).limit(8).exec(function(err, doc) {
   
    if (err) throw err

    else {
      res.send(doc);
    }

  });
});

router.post("/api/saved", function(req, res, next) {

  console.log("BODY: " + req.body.title);

  
  Article.create({
    title: req.body.title,
    date: Date.now(),
    url: req.body.url,
    snippet: req.body.snippet,
    pub_date: req.body.pub_date
  }, function(err) {
    if (err) throw err;

    else {
      res.send("Saved Search");
    }
  });
});

router.post("/api/saved/delete", function(req, res, next) {

  // console.log("hit delete in controller");
  // console.log(req.body.id, "req.body.id");
  Article.findByIdAndRemove(req.body.id, function(err, article){
    if (err) throw err;

    else{
      res.send("Article Deleted")
      console.log("article deleted");
    }
  })
})

// Export routes for server.js to use.
module.exports = router;