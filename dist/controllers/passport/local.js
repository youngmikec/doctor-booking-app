//"use strict";

var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _userService = _interopRequireDefault(require("./../../services/userService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var LocalStrategy = _passportLocal["default"].Strategy;
var initPassportLocal = function initPassportLocal() {
  _passport["default"].use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(email, password, done) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _userService["default"].findUserByEmail(email).then( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", done(null, user, null));
                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return function (_x4) {
                  return _ref2.apply(this, arguments);
                };
              }());
            case 3:
              _context2.next = 9;
              break;
            case 5:
              _context2.prev = 5;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              return _context2.abrupt("return", done(null, false, {
                message: _context2.t0
              }));
            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 5]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
};
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});
_passport["default"].deserializeUser(function (id, done) {
  _userService["default"].findUserById(id).then(function (user) {
    return done(null, user);
  })["catch"](function (error) {
    return done(error, null);
  });
});
module.exports = {
  initPassportLocal: initPassportLocal
};