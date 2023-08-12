//"use strict";

var _express = _interopRequireDefault(require("express"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _expressSession = _interopRequireDefault(require("express-session"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// require('dotenv').config();
require('dotenv').config();
// initalize sequelize with session store
var SequelizeStore = require('connect-session-sequelize')(_expressSession["default"].Store);
var sequelize = new _sequelize["default"](process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  storage: "./session.mysql",
  logging: false,
  dialectOptions: {
    "dateStrings": true,
    "typeCast": true,
    "timezone": "+07:00"
  },
  timezone: "+07:00"
});
var sessionStore = new SequelizeStore({
  db: sequelize
});
var configSession = function configSession(app) {
  app.use((0, _expressSession["default"])({
    key: "express.sid",
    secret: "secret",
    store: sessionStore,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000
    } // 1day
  }));
};

sessionStore.sync();
var sessions = {
  configSession: configSession
};
module.exports = sessions;