//"use strict";

var _index = _interopRequireDefault(require("../models/index.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getSpecializationById = function getSpecializationById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var specialization, post, places;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _index["default"].Specialization.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'name', 'image', 'description']
              });
            case 3:
              specialization = _context.sent;
              if (!specialization) {
                reject("Can't get specialization-id: " + id);
              }
              _context.next = 7;
              return _index["default"].Post.findOne({
                where: {
                  forSpecializationId: id
                },
                attributes: ['id', 'title', 'contentHTML']
              });
            case 7:
              post = _context.sent;
              _context.next = 10;
              return _index["default"].Place.findAll({
                attributes: ['id', 'name']
              });
            case 10:
              places = _context.sent;
              resolve({
                specialization: specialization,
                post: post,
                places: places
              });
              _context.next = 17;
              break;
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllSpecializations = function getAllSpecializations() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var listSpecializations;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Specialization.findAll({
                attributes: ['id', 'name'],
                order: [['name', 'ASC']]
              });
            case 3:
              listSpecializations = _context2.sent;
              resolve(listSpecializations);
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
var deleteSpecializationById = function deleteSpecializationById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var infos, arrId;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index["default"].Specialization.destroy({
                where: {
                  id: id
                }
              });
            case 3:
              _context3.next = 5;
              return _index["default"].Doctor_User.findAll({
                where: {
                  specializationId: id
                }
              });
            case 5:
              infos = _context3.sent;
              arrId = [];
              infos.forEach(function (x) {
                arrId.push(x.id);
              });
              _context3.next = 10;
              return _index["default"].Doctor_User.destroy({
                where: {
                  id: arrId
                }
              });
            case 10:
              resolve(true);
              _context3.next = 16;
              break;
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);
            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 13]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var specializationService = {
  getSpecializationById: getSpecializationById,
  getAllSpecializations: getAllSpecializations,
  deleteSpecializationById: deleteSpecializationById
};
module.exports = specializationService;