//"use strict";

var _homeService = _interopRequireDefault(require("./../services/homeService.js"));
var _userService = _interopRequireDefault(require("./../services/userService.js"));
var _clinicService = _interopRequireDefault(require("./../services/clinicService.js"));
var _specializationService = _interopRequireDefault(require("./../services/specializationService.js"));
var _supporterService = _interopRequireDefault(require("./../services/supporterService.js"));
var _doctorService = _interopRequireDefault(require("./../services/doctorService.js"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // import chatFBServie from "./../services/chatFBService.js";
var getManageDoctor = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var doctors;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userService["default"].getInfoDoctors();
          case 2:
            doctors = _context.sent;
            return _context.abrupt("return", res.render("main/users/admins/manageDoctor.ejs", {
              user: req.user,
              doctors: doctors
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function getManageDoctor(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getManageClinic = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var clinics;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _homeService["default"].getClinics();
          case 2:
            clinics = _context2.sent;
            return _context2.abrupt("return", res.render("main/users/admins/manageClinic.ejs", {
              user: req.user,
              clinics: clinics
            }));
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getManageClinic(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getCreateDoctor = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var clinics, specializations;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _homeService["default"].getClinics();
          case 2:
            clinics = _context3.sent;
            _context3.next = 5;
            return _homeService["default"].getSpecializations();
          case 5:
            specializations = _context3.sent;
            return _context3.abrupt("return", res.render("main/users/admins/createDoctor.ejs", {
              user: req.user,
              clinics: clinics,
              specializations: specializations
            }));
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getCreateDoctor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var postCreateDoctor = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var doctor;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            doctor = {
              'name': req.body.name,
              'phone': req.body.phone,
              'email': req.body.email,
              'password': req.body.password,
              'clinicId': req.body.clinic,
              'specializationId': req.body.specialization,
              'address': req.body.address,
              'avatar': 'doctor.jpg',
              'description': req.body.description
            };
            _context4.prev = 1;
            _context4.next = 4;
            return _userService["default"].createDoctor(doctor);
          case 4:
            return _context4.abrupt("return", res.status(200).json({
              message: 'success'
            }));
          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json({
              error: _context4.t0
            }));
          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 7]]);
  }));
  return function postCreateDoctor(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getCreateClinic = function getCreateClinic(req, res) {
  return res.render("main/users/admins/createClinic.ejs", {
    user: req.user
  });
};
var postCreateClinic = function postCreateClinic(req, res) {
  imageClinicUploadFile(req, res, /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(err) {
      var item, imageClinic, clinic;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!err) {
                _context5.next = 9;
                break;
              }
              console.log(err);
              if (!err.message) {
                _context5.next = 7;
                break;
              }
              console.log(err.message);
              return _context5.abrupt("return", res.status(500).send(err.message));
            case 7:
              console.log(err);
              return _context5.abrupt("return", res.status(500).send(err));
            case 9:
              _context5.prev = 9;
              item = req.body;
              imageClinic = req.file;
              item.image = imageClinic.filename;
              _context5.next = 15;
              return _clinicService["default"].createNewClinic(item);
            case 15:
              clinic = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                message: 'success',
                clinic: clinic
              }));
            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](9);
              console.log(_context5.t0);
              return _context5.abrupt("return", res.status(500).send(_context5.t0));
            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[9, 19]]);
    }));
    return function (_x9) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var storageImageClinic = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "src/public/images/clinics");
  },
  filename: function filename(req, file, callback) {
    var imageName = "".concat(Date.now(), "-").concat(file.originalname);
    callback(null, imageName);
  }
});
var imageClinicUploadFile = (0, _multer["default"])({
  storage: storageImageClinic,
  limits: {
    fileSize: 1048576 * 20
  }
}).single("image");
var postCreateClinicWithoutFile = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var clinic;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _clinicService["default"].createNewClinic(req.body);
          case 3:
            clinic = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              message: 'success',
              clinic: clinic
            }));
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);
            return _context6.abrupt("return", res.status(500).json(_context6.t0));
          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function postCreateClinicWithoutFile(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
var deleteClinicById = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var clinic;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _clinicService["default"].deleteClinicById(req.body.id);
          case 3:
            clinic = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              'message': 'success'
            }));
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
  return function deleteClinicById(_x12, _x13) {
    return _ref7.apply(this, arguments);
  };
}();
var getEditClinic = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var clinic;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _clinicService["default"].getClinicById(req.params.id);
          case 2:
            clinic = _context8.sent;
            return _context8.abrupt("return", res.render("main/users/admins/editClinic.ejs", {
              user: req.user,
              clinic: clinic
            }));
          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function getEditClinic(_x14, _x15) {
    return _ref8.apply(this, arguments);
  };
}();
var putUpdateClinicWithoutFile = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var clinic;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _clinicService["default"].updateClinic(req.body);
          case 3:
            clinic = _context9.sent;
            return _context9.abrupt("return", res.status(200).json({
              message: 'update success',
              clinic: clinic
            }));
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            console.log(_context9.t0);
            return _context9.abrupt("return", res.status(500).json(_context9.t0));
          case 11:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 7]]);
  }));
  return function putUpdateClinicWithoutFile(_x16, _x17) {
    return _ref9.apply(this, arguments);
  };
}();
var putUpdateClinic = function putUpdateClinic(req, res) {
  imageClinicUploadFile(req, res, /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(err) {
      var item, imageClinic, clinic;
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
              imageClinic = req.file;
              item.image = imageClinic.filename;
              _context10.next = 15;
              return _clinicService["default"].updateClinic(item);
            case 15:
              clinic = _context10.sent;
              return _context10.abrupt("return", res.status(200).json({
                message: 'update clinic successful',
                clinic: clinic
              }));
            case 19:
              _context10.prev = 19;
              _context10.t0 = _context10["catch"](9);
              console.log(_context10.t0);
              return _context10.abrupt("return", res.status(500).send(_context10.t0));
            case 23:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[9, 19]]);
    }));
    return function (_x18) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var getSpecializationPage = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
    var specializations;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _specializationService["default"].getAllSpecializations();
          case 2:
            specializations = _context11.sent;
            return _context11.abrupt("return", res.render("main/users/admins/manageSpecialization.ejs", {
              user: req.user,
              specializations: specializations
            }));
          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function getSpecializationPage(_x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();
var deleteDoctorById = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
    var doctor;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _doctorService["default"].deleteDoctorById(req.body.id);
          case 3:
            doctor = _context12.sent;
            return _context12.abrupt("return", res.status(200).json({
              'message': 'success'
            }));
          case 7:
            _context12.prev = 7;
            _context12.t0 = _context12["catch"](0);
            console.log(_context12.t0);
            return _context12.abrupt("return", res.status(500).json(_context12.t0));
          case 11:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function deleteDoctorById(_x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();
var getEditDoctor = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(req, res) {
    var doctor, clinics, specializations;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return _doctorService["default"].getDoctorForEditPage(req.params.id);
          case 2:
            doctor = _context13.sent;
            _context13.next = 5;
            return _homeService["default"].getClinics();
          case 5:
            clinics = _context13.sent;
            _context13.next = 8;
            return _homeService["default"].getSpecializations();
          case 8:
            specializations = _context13.sent;
            return _context13.abrupt("return", res.render("main/users/admins/editDoctor.ejs", {
              user: req.user,
              doctor: doctor,
              clinics: clinics,
              specializations: specializations
            }));
          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return function getEditDoctor(_x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();
var putUpdateDoctorWithoutFile = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(req, res) {
    var item;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.prev = 0;
            item = {
              id: req.body.id,
              name: req.body.nameDoctor,
              phone: req.body.phoneDoctor,
              address: req.body.addressDoctor,
              description: req.body.introEditDoctor,
              clinicId: req.body.clinicDoctor,
              specializationId: req.body.specializationDoctor
            };
            _context14.next = 4;
            return _doctorService["default"].updateDoctorInfo(item);
          case 4:
            return _context14.abrupt("return", res.status(200).json({
              message: 'update info doctor successful'
            }));
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
  return function putUpdateDoctorWithoutFile(_x25, _x26) {
    return _ref14.apply(this, arguments);
  };
}();
var putUpdateDoctor = function putUpdateDoctor(req, res) {
  imageDoctorUploadFile(req, res, /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(err) {
      var item, imageDoctor, doctor;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              if (!err) {
                _context15.next = 6;
                break;
              }
              if (!err.message) {
                _context15.next = 5;
                break;
              }
              return _context15.abrupt("return", res.status(500).send(err.message));
            case 5:
              return _context15.abrupt("return", res.status(500).send(err));
            case 6:
              _context15.prev = 6;
              item = {
                id: req.body.id,
                name: req.body.nameDoctor,
                phone: req.body.phoneDoctor,
                address: req.body.addressDoctor,
                description: req.body.introEditDoctor,
                clinicId: req.body.clinicDoctor,
                specializationId: req.body.specializationDoctor
              };
              imageDoctor = req.file;
              item.avatar = imageDoctor.filename;
              _context15.next = 12;
              return _doctorService["default"].updateDoctorInfo(item);
            case 12:
              doctor = _context15.sent;
              return _context15.abrupt("return", res.status(200).json({
                message: 'update doctor info successful',
                doctor: doctor
              }));
            case 16:
              _context15.prev = 16;
              _context15.t0 = _context15["catch"](6);
              return _context15.abrupt("return", res.status(500).send(_context15.t0));
            case 19:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[6, 16]]);
    }));
    return function (_x27) {
      return _ref15.apply(this, arguments);
    };
  }());
};
var storageImageDoctor = _multer["default"].diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "src/public/images/users");
  },
  filename: function filename(req, file, callback) {
    var imageName = "".concat(Date.now(), "-").concat(file.originalname);
    callback(null, imageName);
  }
});
var imageDoctorUploadFile = (0, _multer["default"])({
  storage: storageImageDoctor,
  limits: {
    fileSize: 1048576 * 20
  }
}).single("avatar");
var getSupporterPage = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(req, res) {
    var supporters;
    return regeneratorRuntime.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return _supporterService["default"].getAllSupporters();
          case 2:
            supporters = _context16.sent;
            return _context16.abrupt("return", res.render("main/users/admins/manageSupporter.ejs", {
              user: req.user,
              supporters: supporters
            }));
          case 4:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16);
  }));
  return function getSupporterPage(_x28, _x29) {
    return _ref16.apply(this, arguments);
  };
}();
var deleteSpecializationById = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(req, res) {
    return regeneratorRuntime.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _context17.prev = 0;
            _context17.next = 3;
            return _specializationService["default"].deleteSpecializationById(req.body.id);
          case 3:
            return _context17.abrupt("return", res.status(200).json({
              message: 'delete specialization successful'
            }));
          case 6:
            _context17.prev = 6;
            _context17.t0 = _context17["catch"](0);
            console.log(_context17.t0);
            return _context17.abrupt("return", res.status(500).json(_context17.t0));
          case 10:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, null, [[0, 6]]);
  }));
  return function deleteSpecializationById(_x30, _x31) {
    return _ref17.apply(this, arguments);
  };
}();
var getManageBotPage = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(req, res) {
    return regeneratorRuntime.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            _context18.prev = 0;
            return _context18.abrupt("return", res.send("Hello word. You'll need a witAI account. More info: please comment on my youtube channel."));
          case 4:
            _context18.prev = 4;
            _context18.t0 = _context18["catch"](0);
            console.log(_context18.t0);
          case 7:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, null, [[0, 4]]);
  }));
  return function getManageBotPage(_x32, _x33) {
    return _ref18.apply(this, arguments);
  };
}();
var deletePostById = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(req, res) {
    return regeneratorRuntime.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            _context19.next = 3;
            return _supporterService["default"].deletePostById(req.body.id);
          case 3:
            return _context19.abrupt("return", res.status(200).json({
              message: 'delete post successful'
            }));
          case 6:
            _context19.prev = 6;
            _context19.t0 = _context19["catch"](0);
            console.log(_context19.t0);
            return _context19.abrupt("return", res.status(500).json(_context19.t0));
          case 10:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, null, [[0, 6]]);
  }));
  return function deletePostById(_x34, _x35) {
    return _ref19.apply(this, arguments);
  };
}();
var getEditPost = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(req, res) {
    var clinics, doctors, specializations, post;
    return regeneratorRuntime.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            _context20.prev = 0;
            _context20.next = 3;
            return _homeService["default"].getClinics();
          case 3:
            clinics = _context20.sent;
            _context20.next = 6;
            return _userService["default"].getInfoDoctors();
          case 6:
            doctors = _context20.sent;
            _context20.next = 9;
            return _homeService["default"].getSpecializations();
          case 9:
            specializations = _context20.sent;
            _context20.next = 12;
            return _supporterService["default"].getDetailPostPage(req.params.id);
          case 12:
            post = _context20.sent;
            return _context20.abrupt("return", res.render('main/users/admins/editPost.ejs', {
              clinics: clinics,
              doctors: doctors,
              specializations: specializations,
              user: req.user,
              post: post
            }));
          case 16:
            _context20.prev = 16;
            _context20.t0 = _context20["catch"](0);
            console.log(_context20.t0);
          case 19:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, null, [[0, 16]]);
  }));
  return function getEditPost(_x36, _x37) {
    return _ref20.apply(this, arguments);
  };
}();
var putUpdatePost = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(req, res) {
    var data;
    return regeneratorRuntime.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            data = {
              id: req.body.id,
              title: req.body.titlePost,
              forDoctorId: req.body.forDoctorId,
              forClinicId: req.body.forClinicId,
              forSpecializationId: req.body.forSpecializationId,
              writerId: req.user.id,
              contentMarkdown: req.body.contentMarkdown,
              contentHTML: req.body.contentHTML,
              updatedAt: Date.now()
            };
            _context21.next = 4;
            return _supporterService["default"].putUpdatePost(data);
          case 4:
            return _context21.abrupt("return", res.status(200).json({
              message: 'update post successful'
            }));
          case 7:
            _context21.prev = 7;
            _context21.t0 = _context21["catch"](0);
            console.log(_context21.t0);
            return _context21.abrupt("return", res.status(500).json(_context21.t0));
          case 11:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, null, [[0, 7]]);
  }));
  return function putUpdatePost(_x38, _x39) {
    return _ref21.apply(this, arguments);
  };
}();
var getManageCreateScheduleForDoctorsPage = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee22(req, res) {
    return regeneratorRuntime.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            return _context22.abrupt("return", res.render('main/users/admins/manageScheduleForDoctors.ejs', {
              user: req.user
            }));
          case 4:
            _context22.prev = 4;
            _context22.t0 = _context22["catch"](0);
            console.log(_context22.t0);
          case 7:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, null, [[0, 4]]);
  }));
  return function getManageCreateScheduleForDoctorsPage(_x40, _x41) {
    return _ref22.apply(this, arguments);
  };
}();
var getInfoStatistical = /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee23(req, res) {
    var month, object;
    return regeneratorRuntime.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;
            month = req.body.month;
            _context23.next = 4;
            return _userService["default"].getInfoStatistical(month);
          case 4:
            object = _context23.sent;
            return _context23.abrupt("return", res.status(200).json(object));
          case 8:
            _context23.prev = 8;
            _context23.t0 = _context23["catch"](0);
            console.log(_context23.t0);
            return _context23.abrupt("return", res.status(500).json(_context23.t0));
          case 12:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, null, [[0, 8]]);
  }));
  return function getInfoStatistical(_x42, _x43) {
    return _ref23.apply(this, arguments);
  };
}();
var admin = {
  getManageDoctor: getManageDoctor,
  getCreateDoctor: getCreateDoctor,
  getEditClinic: getEditClinic,
  getManageClinic: getManageClinic,
  getCreateClinic: getCreateClinic,
  getSpecializationPage: getSpecializationPage,
  getEditDoctor: getEditDoctor,
  getSupporterPage: getSupporterPage,
  getManageBotPage: getManageBotPage,
  getEditPost: getEditPost,
  getManageCreateScheduleForDoctorsPage: getManageCreateScheduleForDoctorsPage,
  getInfoStatistical: getInfoStatistical,
  postCreateDoctor: postCreateDoctor,
  postCreateClinic: postCreateClinic,
  postCreateClinicWithoutFile: postCreateClinicWithoutFile,
  putUpdateClinicWithoutFile: putUpdateClinicWithoutFile,
  putUpdateClinic: putUpdateClinic,
  putUpdateDoctorWithoutFile: putUpdateDoctorWithoutFile,
  putUpdateDoctor: putUpdateDoctor,
  putUpdatePost: putUpdatePost,
  deleteClinicById: deleteClinicById,
  deleteDoctorById: deleteDoctorById,
  deleteSpecializationById: deleteSpecializationById,
  deletePostById: deletePostById
};
module.exports = admin;