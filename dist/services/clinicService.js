//"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index.js"));
var _moment = _interopRequireDefault(require("moment"));
var _sequelize = _interopRequireDefault(require("sequelize"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
;
var Op = _sequelize["default"].Op;
var maxBooking = 5;
var getDetailClinicPage = function getDetailClinicPage(id, date) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var clinic, doctors, places;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Clinic.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'name', 'image', 'address', 'phone', 'introductionHTML', 'description']
              });
            case 3:
              clinic = _context2.sent;
              if (!clinic) {
                reject("Can't get clinic with id = ".concat(id));
              }
              _context2.next = 7;
              return _index["default"].Doctor_User.findAll({
                where: {
                  clinicId: id
                },
                attributes: ['clinicId'],
                include: {
                  model: _index["default"].User,
                  attributes: ['id', 'name', 'avatar', 'address', 'description']
                }
              });
            case 7:
              doctors = _context2.sent;
              _context2.next = 10;
              return Promise.all(doctors.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(doctor) {
                  var schedules, dateNow, currentDate, currentHour, timeNow;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _index["default"].Schedule.findAll({
                            where: {
                              doctorId: doctor.User.id,
                              date: date,
                              sumBooking: _defineProperty({}, Op.lt, maxBooking)
                            },
                            attributes: ['id', 'date', 'time']
                          });
                        case 2:
                          schedules = _context.sent;
                          dateNow = new Date();
                          currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
                          currentHour = "".concat(dateNow.getHours(), ":").concat(dateNow.getMinutes());
                          timeNow = (0, _moment["default"])("".concat(currentDate, " ").concat(currentHour), "DD/MM/YYYY hh:mm").toDate();
                          schedules.forEach(function (sch, index) {
                            var startTime = sch.time.split('-')[0];
                            var timeSchedule = (0, _moment["default"])("".concat(sch.date, " ").concat(startTime), "DD/MM/YYYY hh:mm").toDate();
                            //isDisable nếu time hiện tại > time kế hoạch
                            sch.setDataValue('isDisable', timeNow > timeSchedule);
                          });
                          doctor.setDataValue('schedules', schedules);
                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref2.apply(this, arguments);
                };
              }()));
            case 10:
              _context2.next = 12;
              return _index["default"].Place.findAll({
                attributes: ['id', 'name']
              });
            case 12:
              places = _context2.sent;
              resolve({
                clinic: clinic,
                doctors: doctors,
                places: places
              });
              _context2.next = 19;
              break;
            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 16]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var createNewClinic = function createNewClinic(item) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var clinic;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index["default"].Clinic.create(item);
            case 3:
              clinic = _context3.sent;
              resolve(clinic);
              _context3.next = 10;
              break;
            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);
            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var deleteClinicById = function deleteClinicById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      var clinic, arrId;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _index["default"].Clinic.destroy({
                where: {
                  id: id
                }
              });
            case 3:
              _context4.next = 5;
              return _index["default"].Doctor_User.findAll({
                where: {
                  clinicId: id
                }
              });
            case 5:
              clinic = _context4.sent;
              arrId = [];
              clinic.map(function (x) {
                arrId.push(x.id);
              });
              _context4.next = 10;
              return _index["default"].Doctor_User.destroy({
                where: {
                  id: arrId
                }
              });
            case 10:
              resolve('delete successful');
              _context4.next = 16;
              break;
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              reject(_context4.t0);
            case 16:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 13]]);
    }));
    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getClinicById = function getClinicById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var clinic;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index["default"].Clinic.findOne({
                where: {
                  id: id
                }
              });
            case 3:
              clinic = _context5.sent;
              resolve(clinic);
              _context5.next = 10;
              break;
            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              reject(_context5.t0);
            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));
    return function (_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var updateClinic = function updateClinic(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var clinic;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _index["default"].Clinic.findOne({
                where: {
                  id: data.id
                }
              });
            case 3:
              clinic = _context6.sent;
              _context6.next = 6;
              return clinic.update(data);
            case 6:
              resolve(true);
              _context6.next = 12;
              break;
            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);
            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 9]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var clinicService = {
  getDetailClinicPage: getDetailClinicPage,
  getClinicById: getClinicById,
  createNewClinic: createNewClinic,
  deleteClinicById: deleteClinicById,
  updateClinic: updateClinic
};
module.exports = clinicService;