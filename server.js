var express = require("express");
// var bodyParser = require("body-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

app.use(express.static("public"));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Import routes and give the server access to them.
var routes = require("./controller/controller.js");
app.use("/", routes);

const dbConnectString = process.env.MONGODB_URI || "mongodb://localhost/nytreact";	

// Database configuration with mongoose
mongoose.connect(dbConnectString, function(error){
	if (error) throw error;

	console.log("connnected to mongoose");
});

// Listen on port 3000
app.listen(process.env.PORT || 3000, function() {
  console.log("App running on port 3000!");
});