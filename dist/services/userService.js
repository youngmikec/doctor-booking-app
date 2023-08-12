//"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _index = _interopRequireDefault(require("../models/index.js"));
var _client = _interopRequireDefault(require("../helper/client.js"));
var _lodash = _interopRequireDefault(require("lodash"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _moment = _interopRequireDefault(require("moment"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import elastic from "./../config/elastic.js";
;
// import Sequelize from "sequelize";;
var Op = _sequelize["default"].Op;
var salt = 7;
var createDoctor = function createDoctor(doctor) {
  doctor.roleId = 2;
  doctor.password = _bcryptjs["default"].hashSync(doctor.password, salt);
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var newDoctor, item;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _index["default"].User.create(doctor);
            case 2:
              newDoctor = _context.sent;
              item = {
                doctorId: newDoctor.id,
                clinicId: doctor.clinicId,
                specializationId: doctor.specializationId
              };
              _context.next = 6;
              return _index["default"].Doctor_User.create(item);
            case 6:
              //create doctor elastic

              resolve(newDoctor);
            case 7:
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
};
var getInfoDoctors = function getInfoDoctors() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var doctors;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index["default"].User.findAll({
                where: {
                  roleId: 2
                },
                include: [{
                  model: _index["default"].Doctor_User,
                  required: false
                }, {
                  model: _index["default"].Patient,
                  required: false,
                  where: {
                    statusId: 1
                  }
                }]
              });
            case 3:
              doctors = _context3.sent;
              _context3.next = 6;
              return Promise.all(doctors.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(doctor) {
                  var clinic, specialization, countBooking;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!doctor.Doctor_User) {
                            _context2.next = 13;
                            break;
                          }
                          _context2.next = 3;
                          return _client["default"].getClinicById(doctor.Doctor_User.clinicId);
                        case 3:
                          clinic = _context2.sent;
                          _context2.next = 6;
                          return _client["default"].getSpecializationById(doctor.Doctor_User.specializationId);
                        case 6:
                          specialization = _context2.sent;
                          countBooking = doctor.Patients.length;
                          doctor.setDataValue('clinicName', clinic.name);
                          doctor.setDataValue('specializationName', specialization.name);
                          doctor.setDataValue('countBooking', countBooking);
                          _context2.next = 16;
                          break;
                        case 13:
                          doctor.setDataValue('clinicName', "null");
                          doctor.setDataValue('specializationName', "null");
                          doctor.setDataValue('countBooking', 0);
                        case 16:
                          return _context2.abrupt("return", doctor);
                        case 17:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 6:
              resolve(doctors);
              _context3.next = 12;
              break;
            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);
            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 9]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var findUserByEmail = function findUserByEmail(email) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      var user;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _index["default"].User.findOne({
                where: {
                  email: email
                }
              });
            case 3:
              user = _context4.sent;
              resolve(user);
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              reject(_context4.t0);
            case 10:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));
    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var comparePassword = function comparePassword(password, user) {
  return _bcryptjs["default"].compare(password, user.password);
};
var findUserById = function findUserById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var user;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'name', 'avatar', 'roleId', 'isActive']
              });
            case 3:
              user = _context5.sent;
              resolve(user);
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
function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}
var getInfoStatistical = function getInfoStatistical(month) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var startDate, endDate, patients, doctors, posts, bestDoctor, bestDoctorIdArr, doctorObject, bestSupporter, bestSupporterIdArr, supporterObject;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              startDate = Date.parse(stringToDate("01/".concat(month, "/2020"), "dd/MM/yyyy", "/"));
              endDate = Date.parse(stringToDate("31/".concat(month, "/2020"), "dd/MM/yyyy", "/"));
              _context6.next = 5;
              return _index["default"].Patient.findAndCountAll({
                attributes: ['id', 'doctorId'],
                where: {
                  createdAt: _defineProperty({}, Op.between, [startDate, endDate])
                }
              });
            case 5:
              patients = _context6.sent;
              _context6.next = 8;
              return _index["default"].User.findAndCountAll({
                attributes: ['id'],
                where: {
                  roleId: 2,
                  createdAt: _defineProperty({}, Op.between, [startDate, endDate])
                }
              });
            case 8:
              doctors = _context6.sent;
              _context6.next = 11;
              return _index["default"].Post.findAndCountAll({
                attributes: ['id', 'writerId'],
                where: {
                  forClinicId: -1,
                  forSpecializationId: -1,
                  forDoctorId: -1,
                  createdAt: _defineProperty({}, Op.between, [startDate, endDate])
                }
              });
            case 11:
              posts = _context6.sent;
              bestDoctor = '';
              if (!(+patients.count > 0)) {
                _context6.next = 20;
                break;
              }
              bestDoctorIdArr = (0, _lodash["default"])(patients.rows).groupBy('doctorId').map(function (v, doctorId) {
                return {
                  doctorId: doctorId,
                  patientId: _lodash["default"].map(v, 'id')
                };
              }).value();
              doctorObject = _lodash["default"].maxBy(bestDoctorIdArr, function (o) {
                return o.patientId.length;
              });
              _context6.next = 18;
              return _index["default"].User.findOne({
                where: {
                  id: doctorObject.doctorId
                },
                attributes: ['id', 'name']
              });
            case 18:
              bestDoctor = _context6.sent;
              bestDoctor.setDataValue("count", doctorObject.patientId.length);
            case 20:
              bestSupporter = '';
              if (!(+posts.count > 0)) {
                _context6.next = 28;
                break;
              }
              bestSupporterIdArr = (0, _lodash["default"])(posts.rows).groupBy('writerId').map(function (v, writerId) {
                return {
                  writerId: writerId,
                  postId: _lodash["default"].map(v, 'id')
                };
              }).value();
              supporterObject = _lodash["default"].maxBy(bestSupporterIdArr, function (o) {
                return o.postId.length;
              });
              _context6.next = 26;
              return _index["default"].User.findOne({
                where: {
                  id: supporterObject.writerId
                },
                attributes: ['id', 'name']
              });
            case 26:
              bestSupporter = _context6.sent;
              bestSupporter.setDataValue("count", supporterObject.postId.length);
            case 28:
              resolve({
                patients: patients,
                doctors: doctors,
                posts: posts,
                bestDoctor: bestDoctor,
                bestSupporter: bestSupporter
              });
              _context6.next = 34;
              break;
            case 31:
              _context6.prev = 31;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);
            case 34:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 31]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getInfoDoctorChart = function getInfoDoctorChart(month) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var startDate, endDate, patients;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              startDate = Date.parse(stringToDate("01/".concat(month, "/2020"), "dd/MM/yyyy", "/"));
              endDate = Date.parse(stringToDate("31/".concat(month, "/2020"), "dd/MM/yyyy", "/"));
              _context7.next = 5;
              return _index["default"].Patient.findAndCountAll({
                attributes: ['id', 'doctorId', 'statusId', 'isSentForms'],
                where: {
                  createdAt: _defineProperty({}, Op.between, [startDate, endDate])
                }
              });
            case 5:
              patients = _context7.sent;
              resolve({
                patients: patients
              });
              _context7.next = 12;
              break;
            case 9:
              _context7.prev = 9;
              _context7.t0 = _context7["catch"](0);
              reject(_context7.t0);
            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 9]]);
    }));
    return function (_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var createAllDoctorsSchedule = function createAllDoctorsSchedule() {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var timeArr, threeDaySchedules, i, date, doctors, isCreatedBefore, check;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              timeArr = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'];
              threeDaySchedules = [];
              for (i = 0; i < 3; i++) {
                date = (0, _moment["default"])(new Date()).add(i, 'days').locale('en').format('DD/MM/YYYY');
                threeDaySchedules.push(date);
              }
              _context9.next = 6;
              return _index["default"].User.findAll({
                where: {
                  roleId: 2
                },
                attributes: ['id', 'name'],
                raw: true
              });
            case 6:
              doctors = _context9.sent;
              //only create once
              isCreatedBefore = false; //only check the first doctor with date and time
              _context9.next = 10;
              return _index["default"].Schedule.findAll({
                where: {
                  doctorId: doctors[0].id,
                  date: threeDaySchedules[0],
                  time: timeArr[0]
                }
              });
            case 10:
              check = _context9.sent;
              if (check && check.length > 0) isCreatedBefore = true;
              if (isCreatedBefore) {
                _context9.next = 19;
                break;
              }
              if (!(doctors && doctors.length > 0)) {
                _context9.next = 16;
                break;
              }
              _context9.next = 16;
              return Promise.all(doctors.map(function (doctor) {
                threeDaySchedules.map(function (day) {
                  timeArr.map( /*#__PURE__*/function () {
                    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(time) {
                      var schedule;
                      return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while (1) {
                          switch (_context8.prev = _context8.next) {
                            case 0:
                              schedule = {
                                doctorId: doctor.id,
                                date: day,
                                time: time,
                                maxBooking: 2,
                                sumBooking: 0
                              };
                              _context8.next = 3;
                              return _index["default"].Schedule.create(schedule);
                            case 3:
                            case "end":
                              return _context8.stop();
                          }
                        }
                      }, _callee8);
                    }));
                    return function (_x16) {
                      return _ref9.apply(this, arguments);
                    };
                  }());
                });
              }));
            case 16:
              resolve("Appointments are created successful (in 3 days). Please check your database (schedule table)");
              _context9.next = 20;
              break;
            case 19:
              resolve("Appointments are duplicated. Please check your database (schedule table)");
            case 20:
              _context9.next = 25;
              break;
            case 22:
              _context9.prev = 22;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 25:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 22]]);
    }));
    return function (_x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getAllDoctorsSchedule = function getAllDoctorsSchedule() {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      var schedules;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _index["default"].Schedule.findAll({
                attributes: ['doctorId', 'date', 'time'],
                raw: true
              });
            case 3:
              schedules = _context10.sent;
              resolve(schedules);
              _context10.next = 10;
              break;
            case 7:
              _context10.prev = 7;
              _context10.t0 = _context10["catch"](0);
              reject(_context10.t0);
            case 10:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 7]]);
    }));
    return function (_x17, _x18) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var userService = {
  createDoctor: createDoctor,
  getInfoDoctors: getInfoDoctors,
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
  comparePassword: comparePassword,
  getInfoStatistical: getInfoStatistical,
  getInfoDoctorChart: getInfoDoctorChart,
  createAllDoctorsSchedule: createAllDoctorsSchedule,
  getAllDoctorsSchedule: getAllDoctorsSchedule
};
module.exports = userService;