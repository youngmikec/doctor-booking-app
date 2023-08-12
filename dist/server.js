//"use strict";

// require('dotenv').config();
require('dotenv').config();

// const express = require("express");
// import bodyParser from "body-parser";
// import cookieParser from 'cookie-parser';
// import flash from 'connect-flash';
// import methodOverride from 'method-override';
// import passPort from "passport";
// import configViewEngine from "./config/viewEngine";
// import initRoutes from "./routes/web";
// import session from "./config/session";

var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var passPort = require("passport");
var configViewEngine = require("./config/viewEngine.js");
var initRoutes = require("./routes/web.js");
var session = require("./config/session.js");
var app = express();
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//config session
session.configSession(app);
configViewEngine(app);

// config Passportjs
app.use(passPort.initialize());
app.use(passPort.session());
initRoutes(app);
var port = process.env.PORT;
app.listen(port || 8080, function () {
  return console.log("Doctors care app is running on port ".concat(port, "!"));
});