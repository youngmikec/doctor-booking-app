//"use strict";

var _expressValidator = require("express-validator");
var _en = require("../../lang/en.js");
var _userService = _interopRequireDefault(require("./../services/userService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var validateRegisterUser = [(0, _expressValidator.check)("email").not().isEmpty().withMessage(_en.tranRegister.email_require).trim().isEmail().withMessage(_en.tranRegister.email_incorrect).custom(function (value) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var isExits;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _userService["default"].findUserByEmail(value);
            case 2:
              isExits = _context.sent;
              if (isExits) {
                reject(_en.tranRegister.email_exist);
              }
              resolve(true);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
}), (0, _expressValidator.check)("password", _en.tranRegister.password_incorrect).isLength({
  min: 6
}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/), (0, _expressValidator.check)("password_confirm", _en.tranRegister.password_confirm).custom(function (value, _ref2) {
  var req = _ref2.req;
  return value === req.body.password;
}), (0, _expressValidator.check)("gender", _en.tranRegister.gender_incorrect).isIn(["male", "female"]), (0, _expressValidator.check)("dob", _en.tranRegister.dob_incorrect).isInt({
  gt: 0,
  lt: 32
}), (0, _expressValidator.check)("mob", _en.tranRegister.mob_incorrect).isInt({
  gt: 0,
  lt: 13
}), (0, _expressValidator.check)("yob", _en.tranRegister.yob_incorrect).isInt({
  gt: 1979,
  lt: new Date().getFullYear() + 1
})];
var validateSetNewPassword = [(0, _expressValidator.check)("email").not().isEmpty().withMessage(_en.tranRegister.email_require).trim().isEmail().withMessage(_en.tranRegister.email_incorrect), (0, _expressValidator.check)("password", _en.tranRegister.password_incorrect).isLength({
  min: 6
}).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/), (0, _expressValidator.check)("confirmPassword", _en.tranRegister.password_confirm).custom(function (value, _ref3) {
  var req = _ref3.req;
  return value === req.body.password;
})];
module.exports = {
  validateRegisterUser: validateRegisterUser,
  validateSetNewPassword: validateSetNewPassword
};