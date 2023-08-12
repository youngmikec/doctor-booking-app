//"use strict";

var _index = _interopRequireDefault(require("../models/index.js"));
var _mailer = _interopRequireDefault(require("./../config/mailer.js"));
var _en = require("../../lang/en.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import helper from "../helper/client.js";

var statusPendingId = 3;
var statusFailedId = 2;
var statusSuccessId = 1;
var statusNewId = 4;
var getInfoBooking = function getInfoBooking(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var patient, doctor;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _index["default"].Patient.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'doctorId']
              });
            case 3:
              patient = _context.sent;
              if (!patient) {
                reject("Can't get patient with id = ".concat(id));
              }
              _context.next = 7;
              return _index["default"].User.findOne({
                where: {
                  id: patient.doctorId
                },
                attributes: ['name', 'avatar']
              });
            case 7:
              doctor = _context.sent;
              patient.setDataValue('doctorName', doctor.name);
              patient.setDataValue('doctorAvatar', doctor.avatar);
              resolve(patient);
              _context.next = 16;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getForPatientsTabs = function getForPatientsTabs() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var newPatients, pendingPatients, confirmedPatients, canceledPatients;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Patient.findAll({
                where: {
                  statusId: statusNewId
                },
                order: [['updatedAt', 'DESC']]
              });
            case 3:
              newPatients = _context2.sent;
              _context2.next = 6;
              return _index["default"].Patient.findAll({
                where: {
                  statusId: statusPendingId
                },
                order: [['updatedAt', 'DESC']]
              });
            case 6:
              pendingPatients = _context2.sent;
              _context2.next = 9;
              return _index["default"].Patient.findAll({
                where: {
                  statusId: statusSuccessId
                },
                order: [['updatedAt', 'DESC']]
              });
            case 9:
              confirmedPatients = _context2.sent;
              _context2.next = 12;
              return _index["default"].Patient.findAll({
                where: {
                  statusId: statusFailedId
                },
                order: [['updatedAt', 'DESC']]
              });
            case 12:
              canceledPatients = _context2.sent;
              resolve({
                newPatients: newPatients,
                pendingPatients: pendingPatients,
                confirmedPatients: confirmedPatients,
                canceledPatients: canceledPatients
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
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var changeStatusPatient = function changeStatusPatient(data, logs) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var patient, doctor, schedule, sum, _schedule, _sum, log, dataSend, _dataSend;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index["default"].Patient.findOne({
                where: {
                  id: data.id
                }
              });
            case 3:
              patient = _context3.sent;
              _context3.next = 6;
              return _index["default"].User.findOne({
                where: {
                  id: patient.doctorId
                },
                attributes: ['name', 'avatar']
              });
            case 6:
              doctor = _context3.sent;
              if (!(data.statusId === statusSuccessId)) {
                _context3.next = 14;
                break;
              }
              _context3.next = 10;
              return _index["default"].Schedule.findOne({
                where: {
                  doctorId: patient.doctorId,
                  time: patient.timeBooking,
                  date: patient.dateBooking
                }
              });
            case 10:
              schedule = _context3.sent;
              sum = +schedule.sumBooking;
              _context3.next = 14;
              return schedule.update({
                sumBooking: sum + 1
              });
            case 14:
              if (!(data.statusId === statusFailedId)) {
                _context3.next = 21;
                break;
              }
              _context3.next = 17;
              return _index["default"].Schedule.findOne({
                where: {
                  doctorId: patient.doctorId,
                  time: patient.timeBooking,
                  date: patient.dateBooking
                }
              });
            case 17:
              _schedule = _context3.sent;
              _sum = +_schedule.sumBooking;
              _context3.next = 21;
              return _schedule.update({
                sumBooking: _sum - 1
              });
            case 21:
              _context3.next = 23;
              return patient.update(data);
            case 23:
              _context3.next = 25;
              return _index["default"].SupporterLog.create(logs);
            case 25:
              log = _context3.sent;
              if (!(data.statusId === statusSuccessId)) {
                _context3.next = 30;
                break;
              }
              dataSend = {
                time: patient.timeBooking,
                date: patient.dateBooking,
                doctor: doctor.name
              };
              _context3.next = 30;
              return _mailer["default"].sendEmailNormal(patient.email, _en.transMailBookingSuccess.subject, _en.transMailBookingSuccess.template(dataSend));
            case 30:
              if (!(data.statusId === statusFailedId && patient.email)) {
                _context3.next = 34;
                break;
              }
              _dataSend = {
                time: patient.timeBooking,
                date: patient.dateBooking,
                doctor: doctor.name,
                reason: log.content
              };
              _context3.next = 34;
              return _mailer["default"].sendEmailNormal(patient.email, _en.transMailBookingFailed.subject, _en.transMailBookingFailed.template(_dataSend));
            case 34:
              resolve(patient);
              _context3.next = 40;
              break;
            case 37:
              _context3.prev = 37;
              _context3.t0 = _context3["catch"](0);
              reject(_context3.t0);
            case 40:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 37]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var isBookAble = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(doctorId, date, time) {
    var schedule;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _index["default"].Schedule.findOne({
              where: {
                doctorId: doctorId,
                date: date,
                time: time
              },
              attributes: ['id', 'doctorId', 'date', 'time', 'maxBooking', 'sumBooking']
            });
          case 2:
            schedule = _context4.sent;
            if (!schedule) {
              _context4.next = 5;
              break;
            }
            return _context4.abrupt("return", schedule.sumBooking < schedule.maxBooking);
          case 5:
            return _context4.abrupt("return", false);
          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function isBookAble(_x7, _x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var createNewPatient = function createNewPatient(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var schedule;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _index["default"].Schedule.findOne({
                where: {
                  doctorId: data.doctorId,
                  date: data.dateBooking,
                  time: data.timeBooking
                }
              }).then( /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(schedule) {
                  var patient, sum, doctor, logs, dataSend, isEmailSend;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (!(schedule && schedule.sumBooking < schedule.maxBooking)) {
                            _context5.next = 24;
                            break;
                          }
                          _context5.next = 3;
                          return _index["default"].Patient.create(data);
                        case 3:
                          patient = _context5.sent;
                          data.patientId = patient.id;
                          _context5.next = 7;
                          return _index["default"].ExtraInfo.create(data);
                        case 7:
                          //tăng sumBooking
                          sum = +schedule.sumBooking;
                          _context5.next = 10;
                          return schedule.update({
                            sumBooking: sum + 1
                          });
                        case 10:
                          _context5.next = 12;
                          return _index["default"].User.findOne({
                            where: {
                              id: patient.doctorId
                            },
                            attributes: ['name', 'avatar']
                          });
                        case 12:
                          doctor = _context5.sent;
                          //update logs
                          logs = {
                            patientId: patient.id,
                            content: "The patient made an appointment from the system ",
                            createdAt: Date.now()
                          };
                          _context5.next = 16;
                          return _index["default"].SupporterLog.create(logs);
                        case 16:
                          dataSend = {
                            time: patient.timeBooking,
                            date: patient.dateBooking,
                            doctor: doctor.name
                          };
                          _context5.next = 19;
                          return _mailer["default"].sendEmailNormal(patient.email, _en.transMailBookingNew.subject, _en.transMailBookingNew.template(dataSend));
                        case 19:
                          isEmailSend = _context5.sent;
                          if (!isEmailSend) {
                            console.log("An error occurs when sending an email to: " + patient.email);
                            console.log(isEmailSend);
                          }
                          resolve(patient);
                          _context5.next = 25;
                          break;
                        case 24:
                          resolve("Max booking");
                        case 25:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));
                return function (_x12) {
                  return _ref6.apply(this, arguments);
                };
              }());
            case 3:
              schedule = _context6.sent;
              _context6.next = 9;
              break;
            case 6:
              _context6.prev = 6;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);
            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 6]]);
    }));
    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var getDetailPatient = function getDetailPatient(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var patient;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _index["default"].Patient.findOne({
                where: {
                  id: id
                },
                include: {
                  model: _index["default"].ExtraInfo,
                  required: false
                }
              });
            case 3:
              patient = _context7.sent;
              resolve(patient);
              _context7.next = 10;
              break;
            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              reject(_context7.t0);
            case 10:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 7]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getLogsPatient = function getLogsPatient(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var logs;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _index["default"].SupporterLog.findAll({
                where: {
                  patientId: id
                }
              });
            case 3:
              logs = _context9.sent;
              if (!logs.length) {
                _context9.next = 7;
                break;
              }
              _context9.next = 7;
              return Promise.all(logs.map( /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(log) {
                  var supporter;
                  return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (!log.supporterId) {
                            _context8.next = 7;
                            break;
                          }
                          _context8.next = 3;
                          return _index["default"].User.findOne({
                            where: {
                              id: log.supporterId
                            },
                            attributes: ['name']
                          });
                        case 3:
                          supporter = _context8.sent;
                          log.setDataValue('supporterName', supporter.name);
                          _context8.next = 8;
                          break;
                        case 7:
                          log.setDataValue('supporterName', '');
                        case 8:
                          return _context8.abrupt("return", log);
                        case 9:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));
                return function (_x17) {
                  return _ref9.apply(this, arguments);
                };
              }()));
            case 7:
              resolve(logs);
              _context9.next = 13;
              break;
            case 10:
              _context9.prev = 10;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 10]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getComments = function getComments() {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      var comments;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _index["default"].Comment.findAll({
                where: {
                  status: false
                }
              });
            case 3:
              comments = _context10.sent;
              resolve(comments);
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
    return function (_x18, _x19) {
      return _ref10.apply(this, arguments);
    };
  }());
};
// module.exports = {
//     getInfoBooking: getInfoBooking,
//     getForPatientsTabs: getForPatientsTabs,
//     changeStatusPatient: changeStatusPatient,
//     createNewPatient: createNewPatient,
//     getDetailPatient: getDetailPatient,
//     getLogsPatient: getLogsPatient,
//     getComments: getComments
// };

var patientService = {
  getInfoBooking: getInfoBooking,
  getForPatientsTabs: getForPatientsTabs,
  changeStatusPatient: changeStatusPatient,
  createNewPatient: createNewPatient,
  getDetailPatient: getDetailPatient,
  getLogsPatient: getLogsPatient,
  getComments: getComments
};
module.exports = patientService;