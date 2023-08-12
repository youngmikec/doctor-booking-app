//"use strict";

var _express = _interopRequireDefault(require("express"));
var _expressEjsExtend = _interopRequireDefault(require("express-ejs-extend"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * Config view engine for app
 */
var configViewEngine = function configViewEngine(app) {
  app.use(_express["default"]["static"]("./src/public"));
  app.engine("ejs", _expressEjsExtend["default"]);
  app.set("view engine", "ejs");
  app.set("views", "./src/views");
};
module.exports = configViewEngine;