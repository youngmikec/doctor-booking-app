//"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index.js"));
var _removeMarkdown = _interopRequireDefault(require("remove-markdown"));
var _sequelize = _interopRequireDefault(require("sequelize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import helper from "../helper/client.js";
// import Sequelize from "sequelize";;
;
var Op = _sequelize["default"].Op;

// require('dotenv').config();
require('dotenv').config();
var getSpecializations = function getSpecializations() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var specializations;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _index["default"].Specialization.findAll();
            case 3:
              specializations = _context.sent;
              resolve(specializations);
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getClinics = function getClinics() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var clinics;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Clinic.findAll();
            case 3:
              clinics = _context2.sent;
              resolve(clinics);
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var getDoctors = function getDoctors() {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              resolve(true);
            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getPosts = function getPosts(LIMIT_POST) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var posts;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index["default"].Post.findAll({
                where: {
                  forDoctorId: -1,
                  forSpecializationId: -1,
                  forClinicId: -1
                },
                order: [['createdAt', 'DESC']],
                limit: LIMIT_POST,
                attributes: ['id', 'title', 'contentHTML', 'contentMarkdown']
              });
            case 3:
              posts = _context5.sent;
              _context5.next = 6;
              return Promise.all(posts.map( /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(post) {
                  var content;
                  return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          content = (0, _removeMarkdown["default"])(post.contentMarkdown);
                          post.setDataValue('content', content);
                          return _context4.abrupt("return", post);
                        case 3:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));
                return function (_x9) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 6:
              resolve(posts);
              _context5.next = 12;
              break;
            case 9:
              _context5.prev = 9;
              _context5.t0 = _context5["catch"](0);
              reject(_context5.t0);
            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 9]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var postSearchHomePage = function postSearchHomePage(keyword) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var doctors, specializations, clinics;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _index["default"].User.findAll({
                where: {
                  roleId: 2,
                  name: _defineProperty({}, Op.like, "%".concat(keyword, "%"))
                },
                attributes: ['id', 'name']
              });
            case 3:
              doctors = _context6.sent;
              _context6.next = 6;
              return _index["default"].Specialization.findAll({
                where: {
                  name: _defineProperty({}, Op.like, "%".concat(keyword, "%"))
                },
                attributes: ['id', 'name']
              });
            case 6:
              specializations = _context6.sent;
              _context6.next = 9;
              return _index["default"].Clinic.findAll({
                where: {
                  name: _defineProperty({}, Op.like, "%".concat(keyword, "%"))
                },
                attributes: ['id', 'name']
              });
            case 9:
              clinics = _context6.sent;
              resolve({
                doctors: doctors,
                specializations: specializations,
                clinics: clinics
              });
              _context6.next = 17;
              break;
            case 13:
              _context6.prev = 13;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              reject(_context6.t0);
            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 13]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getDataPageAllClinics = function getDataPageAllClinics() {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var clinics;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              try {
                clinics = _index["default"].Clinic.findAll({
                  attributes: ['id', 'name', "image"]
                });
                resolve(clinics);
              } catch (e) {
                reject(e);
              }
            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));
    return function (_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getDataPageAllDoctors = function getDataPageAllDoctors() {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
      var doctors;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _index["default"].User.findAll({
                where: {
                  roleId: 2
                },
                attributes: ['id', 'name', 'avatar']
              });
            case 3:
              doctors = _context8.sent;
              resolve(doctors);
              _context8.next = 10;
              break;
            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              reject(_context8.t0);
            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 7]]);
    }));
    return function (_x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getDataPageAllSpecializations = function getDataPageAllSpecializations() {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var specializations;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _index["default"].Specialization.findAll({
                attributes: ['id', 'name', "image"]
              });
            case 3:
              specializations = _context9.sent;
              resolve(specializations);
              _context9.next = 10;
              break;
            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 7]]);
    }));
    return function (_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var homeService = {
  getSpecializations: getSpecializations,
  getClinics: getClinics,
  getDoctors: getDoctors,
  getPosts: getPosts,
  postSearchHomePage: postSearchHomePage,
  getDataPageAllClinics: getDataPageAllClinics,
  getDataPageAllDoctors: getDataPageAllDoctors,
  getDataPageAllSpecializations: getDataPageAllSpecializations
};
module.exports = homeService;