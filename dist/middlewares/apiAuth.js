//"use strict";

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkToken = function checkToken(req, res, next) {
  var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (typeof token === 'undefined') {
    return res.json({
      success: false,
      message: 'Auth token is required'
    });
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is invalid (expire or something), try to get new one'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};
module.exports = {
  checkToken: checkToken
};