//"use strict";

var _homeService = _interopRequireDefault(require("./../services/homeService.js"));
var _specializationService = _interopRequireDefault(require("./../services/specializationService.js"));
var _doctorService = _interopRequireDefault(require("./../services/doctorService.js"));
var _userService = _interopRequireDefault(require("./../services/userService.js"));
var _supporterService = _interopRequireDefault(require("./../services/supporterService.js"));
var _clinicService = _interopRequireDefault(require("./../services/clinicService.js"));
var _syncsElaticService = _interopRequireDefault(require("./../services/syncsElaticService.js"));
var _patientService = _interopRequireDefault(require("./../services/patientService.js"));
var _moment = _interopRequireDefault(require("moment"));
var _striptags = _interopRequireDefault(require("striptags"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// require("dotenv").config();
require('dotenv').config();

// striptags to remove HTML

var LIMIT_POST = 5;
var statusPendingId = 3;
var statusFailedId = 2;
var statusSuccessId = 1;
var statusNewId = 4;
var getHomePage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var specializations, clinics, doctors, posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _homeService["default"].getSpecializations();
          case 3:
            specializations = _context.sent;
            _context.next = 6;
            return _homeService["default"].getClinics();
          case 6:
            clinics = _context.sent;
            _context.next = 9;
            return _userService["default"].getInfoDoctors();
          case 9:
            doctors = _context.sent;
            _context.next = 12;
            return _homeService["default"].getPosts(LIMIT_POST);
          case 12:
            posts = _context.sent;
            return _context.abrupt("return", res.render("main/homepage/homepage.ejs", {
              user: req.user,
              specializations: specializations,
              clinics: clinics,
              doctors: doctors,
              posts: posts,
              pageId: process.env.PAGE_ID
            }));
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 16]]);
  }));
  return function getHomePage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getUserPage = function getUserPage(req, res) {
  var currentMonth = new Date().getMonth() + 1;
  res.render("main/users/home.ejs", {
    user: req.user,
    currentMonth: currentMonth
  });
};
var getDetailSpecializationPage = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var object, currentDate, doctors, sevenDaySchedule, i, date, listSpecializations;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _specializationService["default"].getSpecializationById(req.params.id);
          case 3:
            object = _context2.sent;
            // using date to get schedule of doctors
            currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
            _context2.next = 7;
            return _doctorService["default"].getDoctorsForSpecialization(req.params.id, currentDate);
          case 7:
            doctors = _context2.sent;
            sevenDaySchedule = [];
            for (i = 0; i < 5; i++) {
              date = (0, _moment["default"])(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM/YYYY');
              sevenDaySchedule.push(date);
            }
            _context2.next = 12;
            return _specializationService["default"].getAllSpecializations();
          case 12:
            listSpecializations = _context2.sent;
            return _context2.abrupt("return", res.render("main/homepage/specialization.ejs", {
              specialization: object.specialization,
              post: object.post,
              doctors: doctors,
              places: object.places,
              sevenDaySchedule: sevenDaySchedule,
              listSpecializations: listSpecializations
            }));
          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function getDetailSpecializationPage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getDetailDoctorPage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var currentDate, sevenDaySchedule, i, date, object, places, postDoctor;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
            sevenDaySchedule = [];
            for (i = 0; i < 5; i++) {
              date = (0, _moment["default"])(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM/YYYY');
              sevenDaySchedule.push(date);
            }
            _context3.next = 6;
            return _doctorService["default"].getDoctorWithSchedule(req.params.id, currentDate);
          case 6:
            object = _context3.sent;
            _context3.next = 9;
            return _doctorService["default"].getPlacesForDoctor();
          case 9:
            places = _context3.sent;
            _context3.next = 12;
            return _doctorService["default"].getPostForDoctor(req.params.id);
          case 12:
            postDoctor = _context3.sent;
            return _context3.abrupt("return", res.render("main/homepage/doctor.ejs", {
              doctor: object.doctor,
              sevenDaySchedule: sevenDaySchedule,
              postDoctor: postDoctor,
              specialization: object.specialization,
              places: places,
              clinic: object.clinic
            }));
          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            return _context3.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 16]]);
  }));
  return function getDetailDoctorPage(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getBookingPage = function getBookingPage(req, res) {
  res.render("main/homepage/bookingPage.ejs");
};
var getDetailPostPage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var post;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _supporterService["default"].getDetailPostPage(req.params.id);
          case 3:
            post = _context4.sent;
            res.render("main/homepage/post.ejs", {
              post: post
            });
            _context4.next = 11;
            break;
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function getDetailPostPage(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getDetailClinicPage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var currentDate, sevenDaySchedule, i, date, object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            currentDate = (0, _moment["default"])().format('DD/MM/YYYY');
            sevenDaySchedule = [];
            for (i = 0; i < 5; i++) {
              date = (0, _moment["default"])(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM/YYYY');
              sevenDaySchedule.push(date);
            }
            _context5.next = 6;
            return _clinicService["default"].getDetailClinicPage(req.params.id, currentDate);
          case 6:
            object = _context5.sent;
            res.render("main/homepage/clinic.ejs", {
              clinic: object.clinic,
              doctors: object.doctors,
              sevenDaySchedule: sevenDaySchedule,
              places: object.places
            });
            _context5.next = 14;
            break;
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getDetailClinicPage(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getContactPage = function getContactPage(req, res) {
  return res.render('main/homepage/contact.ejs');
};
var getPostsWithPagination = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var role, object;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            role = 'nope';
            _context6.next = 3;
            return _supporterService["default"].getPostsPagination(1, +process.env.LIMIT_GET_POST, role);
          case 3:
            object = _context6.sent;
            return _context6.abrupt("return", res.render("main/homepage/allPostsPagination.ejs", {
              posts: object.posts,
              total: object.total,
              striptags: _striptags["default"]
            }));
          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getPostsWithPagination(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getPostSearch = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var search, results;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            search = req.query.keyword;
            _context7.next = 3;
            return _syncsElaticService["default"].findPostsByTerm(search);
          case 3:
            results = _context7.sent;
            return _context7.abrupt("return", res.render('main/homepage/searchPost.ejs', {
              search: search,
              posts: results.hits.hits
            }));
          case 5:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getPostSearch(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getInfoBookingPage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var patientId, patient;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            patientId = req.params.id;
            _context8.next = 4;
            return _patientService["default"].getInfoBooking(patientId);
          case 4:
            patient = _context8.sent;
            return _context8.abrupt("return", res.render('main/homepage/infoBooking.ejs', {
              patient: patient
            }));
          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
            return _context8.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 8]]);
  }));
  return function getInfoBookingPage(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var postBookingDoctorPageWithoutFiles = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var item, patient;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            item = req.body;
            item.statusId = statusNewId;
            item.historyBreath = req.body.breath;
            item.moreInfo = req.body.extraOldForms;
            if (item.places === 'none') item.placeId = 0;
            item.placeId = item.places;
            item.createdAt = Date.now();
            _context9.next = 10;
            return _patientService["default"].createNewPatient(item);
          case 10:
            patient = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              status: 1,
              message: 'success',
              patient: patient
            }));
          case 14:
            _context9.prev = 14;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json(_context9.t0));
          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 14]]);
  }));
  return function postBookingDoctorPageWithoutFiles(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var postBookingDoctorPageNormal = function postBookingDoctorPageNormal(req, res) {
  imageImageOldForms(req, res, /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(err) {
      var item, imageOldForm, image, patient;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (!err) {
                _context10.next = 9;
                break;
              }
              console.log(err);
              if (!err.message) {
                _context10.next = 7;
                break;
              }
              console.log(err.message);
              return _context10.abrupt("return", res.status(500).send(err.message));
            case 7:
              console.log(err);
              return _context10.abrupt("return", res.status(500).send(err));
            case 9:
              _context10.prev = 9;
              item = req.body;
              imageOldForm = req.files;
              image = {};
              imageOldForm.forEach(function (x, index) {
                image[index] = x.filename;
              });
              item.statusId = statusNewId;
              item.historyBreath = req.body.breath;
              item.moreInfo = req.body.extraOldForms;
              if (item.places === 'none') item.placeId = 0;
              item.placeId = item.places;
              item.oldForms = JSON.stringify(image);
              item.createdAt = Date.now();
              _context10.next = 23;
              return _patientService["default"].createNewPatient(item);
            case 23:
              patient = _context10.sent;
              return _context10.abrupt("return", res.status(200).json({
                status: 1,
                message: 'success',
                patient: patient
              }));
            case 27:
              _context10.prev = 27;
              _context10.t0 = _context10["catch"](9);
              console.log(_context10.t0);
              return _context10.abrupt("return", res.status(500).send(_context10.t0));
            case 31:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[9, 27]]);
    }));
    return function (_x19) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var storageImageOldForms = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "src/public/images/patients");
  },
  filename: function filename(req, file, callback) {
    var imageName = "".concat(Date.now(), "-").concat(file.originalname);
    callback(null, imageName);
  }
});
var imageImageOldForms = (0, _multer["default"])({
  storage: storageImageOldForms,
  limits: {
    fileSize: 1048576 * 20
  }
}).array("oldForms");
var getDetailPatientBooking = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var patient;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            _context11.next = 3;
            return _patientService["default"].getDetailPatient(req.body.patientId);
          case 3:
            patient = _context11.sent;
            return _context11.abrupt("return", res.status(200).json(patient));
          case 7:
            _context11.prev = 7;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
            return _context11.abrupt("return", res.status(500).json(_context11.t0));
          case 11:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, null, [[0, 7]]);
  }));
  return function getDetailPatientBooking(_x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();
var getFeedbackPage = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var doctor;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _doctorService["default"].getDoctorForFeedbackPage(req.params.id);
          case 3:
            doctor = _context12.sent;
            return _context12.abrupt("return", res.render("main/homepage/feedback.ejs", {
              doctor: doctor
            }));
          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.render('main/homepage/pageNotFound.ejs'));
          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function getFeedbackPage(_x22, _x23) {
    return _ref12.apply(this, arguments);
  };
}();
var postCreateFeedback = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var feedback;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return _doctorService["default"].createFeedback(req.body.data);
          case 3:
            feedback = _context13.sent;
            return _context13.abrupt("return", res.status(200).json({
              message: "send feedback success",
              feedback: feedback
            }));
          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);
            console.log(_context13.t0);
            return _context13.abrupt("return", res.status(500).json(_context13.t0));
          case 11:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[0, 7]]);
  }));
  return function postCreateFeedback(_x24, _x25) {
    return _ref13.apply(this, arguments);
  };
}();
var getPageForPatients = function getPageForPatients(req, res) {
  return res.render("main/homepage/forPatients.ejs");
};
var getPageForDoctors = function getPageForDoctors(req, res) {
  return res.render("main/homepage/forDoctors.ejs");
};
var postSearchHomePage = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            _context14.next = 3;
            return _homeService["default"].postSearchHomePage(req.body.keyword);
          case 3:
            result = _context14.sent;
            return _context14.abrupt("return", res.status(200).json(result));
          case 7:
            _context14.prev = 7;
            _context14.t0 = _context14["catch"](0);
            console.log(_context14.t0);
            return _context14.abrupt("return", res.status(500).json(_context14.t0));
          case 11:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[0, 7]]);
  }));
  return function postSearchHomePage(_x26, _x27) {
    return _ref14.apply(this, arguments);
  };
}();
var getPageAllClinics = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(req, res) {
    var clinics;
    return regeneratorRuntime.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            _context15.next = 3;
            return _homeService["default"].getDataPageAllClinics();
          case 3:
            clinics = _context15.sent;
            return _context15.abrupt("return", res.render("main/homepage/allClinics.ejs", {
              clinics: clinics
            }));
          case 7:
            _context15.prev = 7;
            _context15.t0 = _context15["catch"](0);
            console.log(_context15.t0);
          case 10:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, null, [[0, 7]]);
  }));
  return function getPageAllClinics(_x28, _x29) {
    return _ref15.apply(this, arguments);
  };
}();
var getPageAllDoctors = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var doctors;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.prev = 0;
            _context16.next = 3;
            return _homeService["default"].getDataPageAllDoctors();
          case 3:
            doctors = _context16.sent;
            return _context16.abrupt("return", res.render("main/homepage/allDoctors.ejs", {
              doctors: doctors
            }));
          case 7:
            _context16.prev = 7;
            _context16.t0 = _context16["catch"](0);
            console.log(_context16.t0);
          case 10:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[0, 7]]);
  }));
  return function getPageAllDoctors(_x30, _x31) {
    return _ref16.apply(this, arguments);
  };
}();
var getPageAllSpecializations = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
    var specializations;
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return _homeService["default"].getDataPageAllSpecializations();
          case 3:
            specializations = _context17.sent;
            return _context17.abrupt("return", res.render("main/homepage/allSpecializations.ejs", {
              specializations: specializations
            }));
          case 7:
            _context17.prev = 7;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);
          case 10:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 7]]);
  }));
  return function getPageAllSpecializations(_x32, _x33) {
    return _ref17.apply(this, arguments);
  };
}();
var home = {
  getHomePage: getHomePage,
  getUserPage: getUserPage,
  getDetailSpecializationPage: getDetailSpecializationPage,
  getDetailDoctorPage: getDetailDoctorPage,
  getBookingPage: getBookingPage,
  getDetailPostPage: getDetailPostPage,
  getDetailClinicPage: getDetailClinicPage,
  getContactPage: getContactPage,
  getPostsWithPagination: getPostsWithPagination,
  getPostSearch: getPostSearch,
  getInfoBookingPage: getInfoBookingPage,
  postBookingDoctorPageWithoutFiles: postBookingDoctorPageWithoutFiles,
  postBookingDoctorPageNormal: postBookingDoctorPageNormal,
  getDetailPatientBooking: getDetailPatientBooking,
  getFeedbackPage: getFeedbackPage,
  postCreateFeedback: postCreateFeedback,
  getPageForPatients: getPageForPatients,
  getPageForDoctors: getPageForDoctors,
  postSearchHomePage: postSearchHomePage,
  getPageAllClinics: getPageAllClinics,
  getPageAllDoctors: getPageAllDoctors,
  getPageAllSpecializations: getPageAllSpecializations
};
module.exports = home;