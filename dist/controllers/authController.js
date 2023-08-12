//"use strict";

var _expressValidator = require("express-validator");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import authService from "../services/authService.js";

var getLogin = function getLogin(req, res) {
  return res.render("auth/login.ejs", {
    error: req.flash("error")
  });
};
var getRegister = function getRegister(req, res) {
  return res.render("auth/register.ejs");
};
var postRegister = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var hasErrors, errEmail, errPassword, errPasswordConfirm;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            hasErrors = (0, _expressValidator.validationResult)(req).array({
              onlyFirstError: true
            });
            if (!hasErrors.length) {
              try {
                // await authService.register(req.body.name, req.body.rg_email, req.body.rg_password, req.protocol, req.get("host")).then(async (user) => {
                console.log(user);
                // res.redirect('login');
                // let linkVerify = `${req.protocol}://${req.get("host")}/verify/${user.local.verifyToken}`;
                // await authService.register({user}, linkVerify)
                // .then((message) => {
                //     req.flash("success", message);
                //     res.redirect('/login');
                // })
                // .catch((err) => {
                //     console.log(err);
                // });
                // }).catch((err) => {
                //     console.log(err);
                // });
              } catch (err) {
                req.flash("errors", err);
                res.render('/register', {
                  oldData: req.body
                });
              }
            } else {
              errEmail = '', errPassword = '', errPasswordConfirm = '';
              hasErrors.forEach(function (err) {
                if (err.param === 'rg_email') errEmail = err.msg;
                if (err.param === 'rg_password') errPassword = err.msg;
                if (err.param === 'rg_password_again') errPasswordConfirm = err.msg;
              });
              res.render("auth/register", {
                errEmail: errEmail,
                errPassword: errPassword,
                errPasswordConfirm: errPasswordConfirm,
                hasErrors: hasErrors,
                oldData: req.body
              });
            }
          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function postRegister(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var verifyAccount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var errorArr, successArr, verifySuccess;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            errorArr = [];
            successArr = [];
            _context2.prev = 2;
            _context2.next = 5;
            return auth.verifyAccount(req.params.token);
          case 5:
            verifySuccess = _context2.sent;
            successArr.push(verifySuccess);
            req.flash("success", successArr);
            return _context2.abrupt("return", res.redirect("/login"));
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));
  return function verifyAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getLogout = function getLogout(req, res) {
  req.session.destroy(function (err) {
    console.log(err);
    return res.redirect("/login");
  });
};
var checkLoggedIn = function checkLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};
var checkLoggedOut = function checkLoggedOut(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users");
  }
  next();
};
var auth = {
  getLogin: getLogin,
  getRegister: getRegister,
  postRegister: postRegister,
  verifyAccount: verifyAccount,
  getLogout: getLogout,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut
};
module.exports = auth;