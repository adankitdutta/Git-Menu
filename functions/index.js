const functions = require("firebase-functions");

const express = require("express");
const app = express();

//As of now body-parser is not required,but it will be helpful for forms
const bodyParser = require("body-parser");

//Used for Capitalizing,convert to uppercase or lowercase
const _ = require("lodash");

app.use(bodyParser.urlencoded({ extended: true }));

//Firebase initialization for admin
const admin = require("firebase-admin"); // name used here
admin.initializeApp(functions.config().firebase);

//Ejs is used for templating the webpages dynamically
app.set("view engine", "ejs");

//Links the styling of the ejs templates
app.use(express.static("public"));

//Redirects to home url and max-age and s-maxage are used for caching so that website loads faster
app.get("/", (req, res) => {
  res.set("Cache-Control", "public", "max-age=300", "s-maxage=600");
  res.render("index", { name: "GitMenu" });
});

//Redirects to Custom Restaurants
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);
  res.set("Cache-Control", "public", "max-age=300", "s-maxage=600");
  res.render("restaurant", { name: customListName });
});

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

//Exports the app function
exports.app = functions.https.onRequest(app);
