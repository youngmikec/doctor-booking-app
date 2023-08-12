//"use strict";

var _en = require("../../lang/en.js");
var _mailer = _interopRequireDefault(require("./../config/mailer.js"));
var _userService = _interopRequireDefault(require("./../services/userService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// require('dotenv').config();
require('dotenv').config();
var register = function register(_ref, linkVerify) {
  var user = _ref.user;
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var isEmailSend;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _mailer["default"].sendEmailNormal(user.local.email, _en.tranRegisterEmail.subject, _en.tranRegisterEmail.template(linkVerify));
            case 2:
              isEmailSend = _context.sent;
              if (isEmailSend) resolve(_en.tranRegisterEmail.sendSuccess(user.local.email));else reject(_en.tranRegisterEmail.sendFail);
            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var verifyAccount = function verifyAccount(token) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _userService["default"].verifyAccount(token).then(function () {
                resolve(_en.tranRegisterEmail.account_active);
              })["catch"](function (err) {
                reject(err);
              });
            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var resetPassword = function resetPassword(email, linkVerify) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var isEmailSend;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _mailer["default"].sendEmailNormal(email, _en.tranForgotPassword.subject, _en.tranForgotPassword.template(linkVerify));
            case 2:
              isEmailSend = _context3.sent;
              if (isEmailSend) resolve(true);else reject(false);
            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function (_x5, _x6) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var setNewPassword = function setNewPassword(email, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _userService["default"].findUserByEmail(email).then( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(user) {
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (user) {
                            _context4.next = 4;
                            break;
                          }
                          reject("user not found");
                          _context4.next = 7;
                          break;
                        case 4:
                          _context4.next = 6;
                          return _userService["default"].setNewPassword(user._id, password);
                        case 6:
                          resolve(true);
                        case 7:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));
                return function (_x9) {
                  return _ref6.apply(this, arguments);
                };
              }())["catch"](function (err) {
                reject(err);
              });
            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var authService = {
  register: register,
  verifyAccount: verifyAccount,
  resetPassword: resetPassword,
  setNewPassword: setNewPassword
};
module.exports = authService;