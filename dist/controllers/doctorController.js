//"use strict";

var _doctorService = _interopRequireDefault(require("./../services/doctorService.js"));
var _userService = _interopRequireDefault(require("./../services/userService.js"));
var _lodash = _interopRequireDefault(require("lodash"));
var _moment = _interopRequireDefault(require("moment"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var MAX_BOOKING = 2;
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
var getSchedule = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var threeDaySchedules, i, date, data, schedules;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            threeDaySchedules = [];
            for (i = 0; i < 3; i++) {
              date = (0, _moment["default"])(new Date()).add(i, 'days').locale('en').format('DD/MM/YYYY');
              threeDaySchedules.push(date);
            }
            data = {
              threeDaySchedules: threeDaySchedules,
              doctorId: req.user.id
            };
            _context.next = 6;
            return _doctorService["default"].getDoctorSchedules(data);
          case 6:
            schedules = _context.sent;
            schedules.forEach(function (x) {
              x.date = Date.parse(stringToDate(x.date, "dd/MM/yyyy", "/"));
            });
            schedules = _lodash["default"].sortBy(schedules, function (x) {
              return x.date;
            });
            schedules.forEach(function (x) {
              x.date = (0, _moment["default"])(x.date).format("DD/MM/YYYY");
            });
            return _context.abrupt("return", res.render("main/users/admins/schedule.ejs", {
              user: req.user,
              schedules: schedules,
              threeDaySchedules: threeDaySchedules
            }));
          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function getSchedule(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getCreateSchedule = function getCreateSchedule(req, res) {
  return res.render("main/users/admins/createSchedule.ejs", {
    user: req.user
  });
};
var postCreateSchedule = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _doctorService["default"].postCreateSchedule(req.user, req.body.schedule_arr, MAX_BOOKING);
          case 2:
            return _context2.abrupt("return", res.status(200).json({
              "status": 1,
              "message": 'success'
            }));
          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function postCreateSchedule(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getScheduleDoctorByDate = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var object, data, _doctor;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _doctorService["default"].getScheduleDoctorByDate(req.body.doctorId, req.body.date);
          case 3:
            object = _context3.sent;
            data = object.schedule;
            _doctor = object.doctor;
            return _context3.abrupt("return", res.status(200).json({
              status: 1,
              message: data,
              doctor: _doctor
            }));
          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0));
          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function getScheduleDoctorByDate(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getInfoDoctorById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _doctor2;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _doctorService["default"].getInfoDoctorById(req.body.id);
          case 3:
            _doctor2 = _context4.sent;
            return _context4.abrupt("return", res.status(200).json({
              'message': 'success',
              'doctor': _doctor2
            }));
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json(_context4.t0));
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getInfoDoctorById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getManageAppointment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var currentDate, canActive, date, data, appointments, sort, _final;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // let date = "30/03/2020";
            currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
            canActive = false;
            date = '';
            if (req.query.dateDoctorAppointment) {
              date = req.query.dateDoctorAppointment;
              if (date === currentDate) canActive = true;
            } else {
              //get currentDate
              date = currentDate;
              canActive = true;
            }
            data = {
              date: date,
              doctorId: req.user.id
            };
            _context5.next = 7;
            return _doctorService["default"].getPatientsBookAppointment(data);
          case 7:
            appointments = _context5.sent;
            // sort by range time
            sort = _lodash["default"].sortBy(appointments, function (x) {
              return x.timeBooking;
            }); //group by range time
            _final = _lodash["default"].groupBy(sort, function (x) {
              return x.timeBooking;
            });
            return _context5.abrupt("return", res.render("main/users/admins/manageAppointment.ejs", {
              user: req.user,
              appointments: _final,
              date: date,
              active: canActive
            }));
          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getManageAppointment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getManageChart = function getManageChart(req, res) {
  return res.render("main/users/admins/manageChartDoctor.ejs", {
    user: req.user
  });
};
var postSendFormsToPatient = function postSendFormsToPatient(req, res) {
  FileSendPatient(req, res, /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(err) {
      var patient;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!err) {
                _context6.next = 9;
                break;
              }
              console.log(err);
              if (!err.message) {
                _context6.next = 7;
                break;
              }
              console.log(err.message);
              return _context6.abrupt("return", res.status(500).send(err.message));
            case 7:
              console.log(err);
              return _context6.abrupt("return", res.status(500).send(err));
            case 9:
              _context6.prev = 9;
              _context6.next = 12;
              return _doctorService["default"].sendFormsForPatient(req.body.patientId, req.files);
            case 12:
              patient = _context6.sent;
              return _context6.abrupt("return", res.status(200).json({
                status: 1,
                message: 'sent files success',
                patient: patient
              }));
            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](9);
              console.log(_context6.t0);
              return _context6.abrupt("return", res.status(500).send(_context6.t0));
            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[9, 16]]);
    }));
    return function (_x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var storageFormsSendPatient = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "src/public/images/patients/remedy");
  },
  filename: function filename(req, file, callback) {
    var imageName = "".concat(Date.now(), "-").concat(file.originalname);
    callback(null, imageName);
  }
});
var FileSendPatient = (0, _multer["default"])({
  storage: storageFormsSendPatient,
  limits: {
    fileSize: 1048576 * 20
  }
}).array("filesSend");
var postCreateChart = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var object;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _userService["default"].getInfoDoctorChart(req.body.month);
          case 3:
            object = _context7.sent;
            return _context7.abrupt("return", res.status(200).json(object));
          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(500).json(_context7.t0));
          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return function postCreateChart(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var postAutoCreateAllDoctorsSchedule = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _userService["default"].createAllDoctorsSchedule();
          case 3:
            data = _context8.sent;
            return _context8.abrupt("return", res.status(200).json(data));
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.status(500).json(_context8.t0));
          case 11:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function postAutoCreateAllDoctorsSchedule(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var doctor = {
  getSchedule: getSchedule,
  getCreateSchedule: getCreateSchedule,
  postCreateSchedule: postCreateSchedule,
  getScheduleDoctorByDate: getScheduleDoctorByDate,
  getInfoDoctorById: getInfoDoctorById,
  getManageAppointment: getManageAppointment,
  getManageChart: getManageChart,
  postSendFormsToPatient: postSendFormsToPatient,
  postCreateChart: postCreateChart,
  postAutoCreateAllDoctorsSchedule: postAutoCreateAllDoctorsSchedule
};
module.exports = doctor;