//"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _index = _interopRequireDefault(require("../models/index.js"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _moment = _interopRequireDefault(require("moment"));
var _patientService = _interopRequireDefault(require("./patientService.js"));
var _mailer = _interopRequireDefault(require("../config/mailer.js"));
var _en = require("../../lang/en.js");
var _minizipAsm = _interopRequireDefault(require("minizip-asm.js"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
;
var Op = _sequelize["default"].Op;

// var Minizip = require('minizip-asm.js');

// var fs = require("fs");

var PATH_ZIP = "src/public/images/patients/remedy/zip";
var maxBooking = 2;
var statusPendingId = 3;
var statusFailedId = 2;
var statusSuccessId = 1;
var statusNewId = 4;
var statusDone = 5;
var getDoctorWithSchedule = function getDoctorWithSchedule(id, currentDate) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var doctor, specializationId, specialization, clinicId, clinic, date, currentHour, timeNow;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id
                },
                attributes: {
                  exclude: ['password']
                },
                include: [{
                  model: _index["default"].Schedule,
                  required: false,
                  where: {
                    date: currentDate,
                    sumBooking: _defineProperty({}, Op.lt, maxBooking)
                  }
                }, {
                  model: _index["default"].Doctor_User,
                  attributes: ['specializationId', 'clinicId']
                }, {
                  model: _index["default"].Comment,
                  where: {
                    status: true
                  },
                  attributes: ['id', 'timeBooking', 'dateBooking', 'name', 'content', 'createdAt', 'status'],
                  required: false
                }]
              });
            case 3:
              doctor = _context.sent;
              if (!doctor) {
                reject("Can't get doctor with id = ".concat(id));
              }
              specializationId = doctor.Doctor_User.specializationId;
              _context.next = 8;
              return getSpecializationById(specializationId);
            case 8:
              specialization = _context.sent;
              clinicId = doctor.Doctor_User.clinicId;
              _context.next = 12;
              return _index["default"].Clinic.findOne({
                where: {
                  id: clinicId
                },
                attributes: ['address']
              });
            case 12:
              clinic = _context.sent;
              date = new Date();
              currentHour = "".concat(date.getHours(), ":").concat(date.getMinutes());
              timeNow = (0, _moment["default"])("".concat(currentDate, " ").concat(currentHour), "DD/MM/YYYY hh:mm").toDate();
              doctor.Schedules.forEach(function (schedule, index) {
                var startTime = schedule.time.split('-')[0];
                var timeSchedule = (0, _moment["default"])("".concat(schedule.date, " ").concat(startTime), "DD/MM/YYYY hh:mm").toDate();
                //isDisable nếu time hiện tại > time kế hoạch
                schedule.setDataValue('isDisable', timeNow > timeSchedule);
              });
              resolve({
                doctor: doctor,
                specialization: specialization,
                clinic: clinic
              });
              _context.next = 23;
              break;
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);
            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 20]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getPostForDoctor = function getPostForDoctor(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var post;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Post.findOne({
                where: {
                  forDoctorId: id
                },
                order: [['createdAt', 'DESC']],
                attributes: ['id', 'title', 'contentHTML']
              });
            case 3:
              post = _context2.sent;
              resolve(post);
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
var postCreateSchedule = function postCreateSchedule(user, arrSchedule, maxBooking) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      var schedule;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return Promise.all(arrSchedule.map( /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(schedule) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return _index["default"].Schedule.create({
                            'doctorId': user.id,
                            'date': schedule.date,
                            'time': schedule.time,
                            'maxBooking': maxBooking,
                            'sumBooking': 0,
                            'createdAt': Date.now()
                          });
                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));
                return function (_x7) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 3:
              schedule = _context4.sent;
              resolve(schedule);
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
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var createPatient = function createPatient(item) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var patient;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index["default"].Patient.create(item);
            case 3:
              patient = _context5.sent;
              resolve(patient);
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
var getScheduleDoctorByDate = function getScheduleDoctorByDate(id, date) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      var schedule, doctor, dateNow, currentDate, currentHour, timeNow;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _index["default"].Schedule.findAll({
                where: {
                  doctorId: id,
                  date: date,
                  sumBooking: _defineProperty({}, Op.lt, maxBooking)
                }
              });
            case 3:
              schedule = _context6.sent;
              _context6.next = 6;
              return getDoctorById(id);
            case 6:
              doctor = _context6.sent;
              dateNow = new Date();
              currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
              currentHour = "".concat(dateNow.getHours(), ":").concat(dateNow.getMinutes());
              timeNow = (0, _moment["default"])("".concat(currentDate, " ").concat(currentHour), "DD/MM/YYYY hh:mm").toDate();
              schedule.forEach(function (sch, index) {
                var startTime = sch.time.split('-')[0];
                var timeSchedule = (0, _moment["default"])("".concat(sch.date, " ").concat(startTime), "DD/MM/YYYY hh:mm").toDate();
                //isDisable nếu time hiện tại > time kế hoạch
                sch.setDataValue('isDisable', timeNow > timeSchedule);
              });
              resolve({
                schedule: schedule,
                doctor: doctor
              });
              _context6.next = 18;
              break;
            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              reject(_context6.t0);
            case 18:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 15]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getDoctorById = function getDoctorById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var doctor;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id,
                  roleId: 2
                }
              });
            case 3:
              doctor = _context7.sent;
              resolve(doctor);
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
    return function (_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var getSpecializationById = function getSpecializationById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
      var specialization;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _index["default"].Specialization.findOne({
                where: {
                  id: id
                }
              });
            case 3:
              specialization = _context8.sent;
              resolve(specialization);
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
var getDoctorsForSpecialization = function getDoctorsForSpecialization(id, date) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      var doctors;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _index["default"].Doctor_User.findAll({
                where: {
                  specializationId: id
                },
                attributes: ['specializationId'],
                include: {
                  model: _index["default"].User,
                  attributes: ['id', 'name', 'avatar', 'address', 'description']
                }
              });
            case 3:
              doctors = _context10.sent;
              _context10.next = 6;
              return Promise.all(doctors.map( /*#__PURE__*/function () {
                var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(doctor) {
                  var schedule, dateNow, currentDate, currentHour, timeNow;
                  return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return _index["default"].Schedule.findAll({
                            where: {
                              doctorId: doctor.User.id,
                              date: date,
                              sumBooking: _defineProperty({}, Op.lt, maxBooking)
                            },
                            attributes: ['id', 'date', 'time']
                          });
                        case 2:
                          schedule = _context9.sent;
                          dateNow = new Date();
                          currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
                          currentHour = "".concat(dateNow.getHours(), ":").concat(dateNow.getMinutes());
                          timeNow = (0, _moment["default"])("".concat(currentDate, " ").concat(currentHour), "DD/MM/YYYY hh:mm").toDate();
                          schedule.forEach(function (sch, index) {
                            var startTime = sch.time.split('-')[0];
                            var timeSchedule = (0, _moment["default"])("".concat(sch.date, " ").concat(startTime), "DD/MM/YYYY hh:mm").toDate();
                            //isDisable nếu time hiện tại > time kế hoạch
                            sch.setDataValue('isDisable', timeNow > timeSchedule);
                          });
                          doctor.setDataValue('schedule', schedule);
                        case 9:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));
                return function (_x18) {
                  return _ref10.apply(this, arguments);
                };
              }()));
            case 6:
              resolve(doctors);
              _context10.next = 12;
              break;
            case 9:
              _context10.prev = 9;
              _context10.t0 = _context10["catch"](0);
              reject(_context10.t0);
            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 9]]);
    }));
    return function (_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getInfoDoctorById = function getInfoDoctorById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
      var doctor, specialization, clinic;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              _context11.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'name', 'avatar', 'address', 'phone', 'description'],
                include: {
                  model: _index["default"].Doctor_User,
                  attributes: ['clinicId', 'specializationId']
                }
              });
            case 3:
              doctor = _context11.sent;
              _context11.next = 6;
              return _index["default"].Specialization.findOne({
                where: {
                  id: doctor.Doctor_User.specializationId
                },
                attributes: ['name']
              });
            case 6:
              specialization = _context11.sent;
              _context11.next = 9;
              return _index["default"].Clinic.findOne({
                where: {
                  id: doctor.Doctor_User.clinicId
                },
                attributes: ['name']
              });
            case 9:
              clinic = _context11.sent;
              doctor.setDataValue('specializationName', specialization.name);
              doctor.setDataValue('clinicName', clinic.name);
              resolve(doctor);
              _context11.next = 18;
              break;
            case 15:
              _context11.prev = 15;
              _context11.t0 = _context11["catch"](0);
              reject(_context11.t0);
            case 18:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 15]]);
    }));
    return function (_x19, _x20) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var deleteDoctorById = function deleteDoctorById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
      var doctor;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              _context12.next = 3;
              return _index["default"].User.destroy({
                where: {
                  id: id
                }
              });
            case 3:
              _context12.next = 5;
              return _index["default"].Doctor_User.findOne({
                where: {
                  doctorId: id
                }
              });
            case 5:
              doctor = _context12.sent;
              if (!doctor) {
                _context12.next = 9;
                break;
              }
              _context12.next = 9;
              return _index["default"].Doctor_User.destroy({
                where: {
                  id: doctor.id
                }
              });
            case 9:
              resolve('delete successful');
              _context12.next = 15;
              break;
            case 12:
              _context12.prev = 12;
              _context12.t0 = _context12["catch"](0);
              reject(_context12.t0);
            case 15:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 12]]);
    }));
    return function (_x21, _x22) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var getDoctorForEditPage = function getDoctorForEditPage(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var doctor;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              _context13.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id
                },
                include: {
                  model: _index["default"].Doctor_User
                }
              });
            case 3:
              doctor = _context13.sent;
              resolve(doctor);
              _context13.next = 10;
              break;
            case 7:
              _context13.prev = 7;
              _context13.t0 = _context13["catch"](0);
              reject(_context13.t0);
            case 10:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 7]]);
    }));
    return function (_x23, _x24) {
      return _ref13.apply(this, arguments);
    };
  }());
};
var updateDoctorInfo = function updateDoctorInfo(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var doctor;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              _context14.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: data.id
                },
                include: {
                  model: _index["default"].Doctor_User,
                  required: false
                }
              });
            case 3:
              doctor = _context14.sent;
              _context14.next = 6;
              return doctor.update(data);
            case 6:
              if (!doctor.Doctor_User) {
                _context14.next = 11;
                break;
              }
              _context14.next = 9;
              return doctor.Doctor_User.update(data);
            case 9:
              _context14.next = 13;
              break;
            case 11:
              _context14.next = 13;
              return _index["default"].Doctor_User.create({
                doctorId: data.id,
                specializationId: data.specializationId,
                clinicId: data.clinicId
              });
            case 13:
              resolve(true);
              _context14.next = 19;
              break;
            case 16:
              _context14.prev = 16;
              _context14.t0 = _context14["catch"](0);
              reject(_context14.t0);
            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 16]]);
    }));
    return function (_x25, _x26) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var getPatientsBookAppointment = function getPatientsBookAppointment(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(resolve, reject) {
      var patients;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              _context15.next = 3;
              return _index["default"].Patient.findAll({
                where: {
                  doctorId: data.doctorId,
                  dateBooking: data.date,
                  statusId: statusSuccessId
                },
                order: [['updatedAt', 'ASC']],
                attributes: ['id', 'name', 'gender', 'timeBooking', 'description', 'isSentForms']
              });
            case 3:
              patients = _context15.sent;
              resolve(patients);
              _context15.next = 10;
              break;
            case 7:
              _context15.prev = 7;
              _context15.t0 = _context15["catch"](0);
              reject(_context15.t0);
            case 10:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 7]]);
    }));
    return function (_x27, _x28) {
      return _ref15.apply(this, arguments);
    };
  }());
};
var getDoctorSchedules = function getDoctorSchedules(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(resolve, reject) {
      var schedules;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              _context16.next = 3;
              return _index["default"].Schedule.findAll({
                where: {
                  doctorId: data.doctorId,
                  date: _defineProperty({}, Op["in"], data.threeDaySchedules)
                }
              });
            case 3:
              schedules = _context16.sent;
              resolve(schedules);
              _context16.next = 10;
              break;
            case 7:
              _context16.prev = 7;
              _context16.t0 = _context16["catch"](0);
              reject(_context16.t0);
            case 10:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 7]]);
    }));
    return function (_x29, _x30) {
      return _ref16.apply(this, arguments);
    };
  }());
};
var getPlacesForDoctor = function getPlacesForDoctor() {
  return new Promise( /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(resolve, reject) {
      var places;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              _context17.next = 3;
              return _index["default"].Place.findAll({
                attributes: ['id', 'name']
              });
            case 3:
              places = _context17.sent;
              resolve(places);
              _context17.next = 10;
              break;
            case 7:
              _context17.prev = 7;
              _context17.t0 = _context17["catch"](0);
              reject(_context17.t0);
            case 10:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 7]]);
    }));
    return function (_x31, _x32) {
      return _ref17.apply(this, arguments);
    };
  }());
};
var removeAccents = function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
};
var sendFormsForPatient = function sendFormsForPatient(id, files) {
  return new Promise( /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(resolve, reject) {
      var patient, doctor, name, phone, year, password, mz, nameZip, pathZip, filename, data, image, count;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              _context18.next = 3;
              return _patientService["default"].getDetailPatient(id);
            case 3:
              patient = _context18.sent;
              _context18.next = 6;
              return _index["default"].User.findOne({
                where: {
                  id: patient.doctorId
                },
                attributes: ['name', 'avatar']
              });
            case 6:
              doctor = _context18.sent;
              name = removeAccents(patient.name).split(' ').join('').toLowerCase();
              phone = patient.phone.substring(0, 3);
              year = patient.year.substring(2, 4);
              password = "".concat(name, "-").concat(phone, "-").concat(year);
              mz = new _minizipAsm["default"]();
              files.forEach(function (file) {
                var fileSendToPatient = _fs["default"].readFileSync(file.path);
                mz.append(file.originalname, fileSendToPatient, {
                  password: password
                });
              });
              nameZip = "".concat(Date.now(), "-patientId-").concat(id, ".zip");
              pathZip = "".concat(PATH_ZIP, "/").concat(nameZip);
              _fs["default"].writeFileSync(pathZip, new Buffer(mz.zip()));
              filename = "Information-invoice-".concat(patient.dateBooking, ".zip");
              data = {
                doctor: doctor.name
              };
              _context18.next = 20;
              return _mailer["default"].sendEmailWithAttachment(patient.email, _en.transMailRemedy.subject, _en.transMailRemedy.template(data), filename, pathZip);
            case 20:
              _context18.next = 22;
              return patient.update({
                isSentForms: true
              });
            case 22:
              if (!patient.ExtraInfo) {
                _context18.next = 29;
                break;
              }
              image = JSON.parse(patient.ExtraInfo.sendForms);
              count = 0;
              if (image) {
                count = Object.keys(image).length;
              } else {
                image = {};
              }
              files.forEach(function (x, index) {
                image[count + index] = x.filename;
              });
              _context18.next = 29;
              return patient.ExtraInfo.update({
                sendForms: JSON.stringify(image)
              });
            case 29:
              resolve(patient);
              _context18.next = 35;
              break;
            case 32:
              _context18.prev = 32;
              _context18.t0 = _context18["catch"](0);
              reject(_context18.t0);
            case 35:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 32]]);
    }));
    return function (_x33, _x34) {
      return _ref18.apply(this, arguments);
    };
  }());
};
var getDoctorForFeedbackPage = function getDoctorForFeedbackPage(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(resolve, reject) {
      var doctor;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              _context19.next = 3;
              return _index["default"].User.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'name', 'avatar']
              });
            case 3:
              doctor = _context19.sent;
              if (!doctor) {
                reject("Can't get feedback with doctorId=".concat(id));
              }
              resolve(doctor);
              _context19.next = 11;
              break;
            case 8:
              _context19.prev = 8;
              _context19.t0 = _context19["catch"](0);
              reject(_context19.t0);
            case 11:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 8]]);
    }));
    return function (_x35, _x36) {
      return _ref19.apply(this, arguments);
    };
  }());
};
var createFeedback = function createFeedback(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(resolve, reject) {
      var doctorId, phone, patient, feedback, cm;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              doctorId = data.doctorId;
              phone = data.feedbackPhone; //check patient
              _context20.next = 5;
              return _index["default"].Patient.findOne({
                where: {
                  doctorId: doctorId,
                  phone: phone,
                  statusId: statusSuccessId
                },
                attributes: ['name', 'timeBooking', 'dateBooking']
              });
            case 5:
              patient = _context20.sent;
              if (!patient) {
                _context20.next = 14;
                break;
              }
              feedback = {
                doctorId: doctorId,
                name: patient.name,
                timeBooking: patient.timeBooking,
                dateBooking: patient.dateBooking,
                phone: phone,
                content: data.feedbackContent,
                createdAt: Date.now()
              };
              _context20.next = 10;
              return _index["default"].Comment.create(feedback);
            case 10:
              cm = _context20.sent;
              resolve(cm);
              _context20.next = 15;
              break;
            case 14:
              resolve('patient not exist');
            case 15:
              _context20.next = 20;
              break;
            case 17:
              _context20.prev = 17;
              _context20.t0 = _context20["catch"](0);
              reject(_context20.t0);
            case 20:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 17]]);
    }));
    return function (_x37, _x38) {
      return _ref20.apply(this, arguments);
    };
  }());
};
var doctorService = {
  getDoctorForFeedbackPage: getDoctorForFeedbackPage,
  getDoctorWithSchedule: getDoctorWithSchedule,
  postCreateSchedule: postCreateSchedule,
  createPatient: createPatient,
  getPostForDoctor: getPostForDoctor,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getDoctorsForSpecialization: getDoctorsForSpecialization,
  getInfoDoctorById: getInfoDoctorById,
  deleteDoctorById: deleteDoctorById,
  getDoctorForEditPage: getDoctorForEditPage,
  updateDoctorInfo: updateDoctorInfo,
  getPatientsBookAppointment: getPatientsBookAppointment,
  getDoctorSchedules: getDoctorSchedules,
  getPlacesForDoctor: getPlacesForDoctor,
  sendFormsForPatient: sendFormsForPatient,
  createFeedback: createFeedback
};
module.exports = doctorService;