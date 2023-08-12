//"use strict";

var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
var _homeController = _interopRequireDefault(require("./../controllers/homeController.js"));
var _authController = _interopRequireDefault(require("./../controllers/authController.js"));
var _adminController = _interopRequireDefault(require("./../controllers/adminController.js"));
var _doctorController = _interopRequireDefault(require("./../controllers/doctorController.js"));
var _supporterController = _interopRequireDefault(require("./../controllers/supporterController.js"));
var _clinicController = _interopRequireDefault(require("./../controllers/clinicController.js"));
var _botFBController = _interopRequireDefault(require("./../controllers/botFBController.js"));
var _userService = _interopRequireDefault(require("./../services/userService.js"));
var _multer = _interopRequireDefault(require("multer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// const multer = require('multer');
var upload = (0, _multer["default"])();
var router = _express["default"].Router();
var LocalStrategy = _passportLocal["default"].Strategy;
_passport["default"].use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, email, password, done) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _userService["default"].findUserByEmail(email).then( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
                var match;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (user) {
                          _context.next = 2;
                          break;
                        }
                        return _context.abrupt("return", done(null, false, req.flash("error", "Email không tồn tại")));
                      case 2:
                        if (!(user && user.isActive === 1)) {
                          _context.next = 11;
                          break;
                        }
                        _context.next = 5;
                        return _userService["default"].comparePassword(password, user);
                      case 5:
                        match = _context.sent;
                        if (!match) {
                          _context.next = 10;
                          break;
                        }
                        return _context.abrupt("return", done(null, user, null));
                      case 10:
                        return _context.abrupt("return", done(null, false, req.flash("error", "Mật khẩu không chính xác")));
                      case 11:
                        if (!(user && user.isActive === 0)) {
                          _context.next = 13;
                          break;
                        }
                        return _context.abrupt("return", done(null, false, req.flash("error", "Tài khoản chưa được kích hoạt")));
                      case 13:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));
              return function (_x5) {
                return _ref2.apply(this, arguments);
              };
            }());
          case 3:
            _context2.next = 9;
            break;
          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", done(null, false, {
              message: _context2.t0
            }));
          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));
_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});
_passport["default"].deserializeUser(function (id, done) {
  _userService["default"].findUserById(id).then(function (user) {
    return done(null, user);
  })["catch"](function (error) {
    return done(error, null);
  });
});
var initRoutes = function initRoutes(app) {
  router.get("/all-clinics", _homeController["default"].getPageAllClinics);
  router.get("/all-doctors", _homeController["default"].getPageAllDoctors);
  router.get("/all-specializations", _homeController["default"].getPageAllSpecializations);
  router.get('/webhook', _botFBController["default"].getWebhookFB);
  router.post('/webhook', _botFBController["default"].postWebhookFB);
  router.get("/set-up-bot-facebook", _botFBController["default"].getSetupBotFBPage);
  router.post("/set-up-bot-facebook", _botFBController["default"].handleSetupBotFBPage);
  router.get("/booking-online-messenger", _botFBController["default"].getBookingOnlineMessengerPage);
  router.post("/set-info-booking-online-messenger", _botFBController["default"].setInfoBookingMessenger);
  router.get('/feedback/:id', _homeController["default"].getFeedbackPage);
  router.post('/feedback/create', _homeController["default"].postCreateFeedback);
  router.get('/for-patients', _homeController["default"].getPageForPatients);
  router.get('/for-doctors', _homeController["default"].getPageForDoctors);
  router.post('/search-homepage', _homeController["default"].postSearchHomePage);
  router.get('/', _homeController["default"].getHomePage);
  router.get('/contact', _homeController["default"].getContactPage);
  router.get('/detail/specialization/:id', _homeController["default"].getDetailSpecializationPage);
  router.get('/detail/doctor/:id', _homeController["default"].getDetailDoctorPage);
  router.post('/booking-doctor-without-files/create', _homeController["default"].postBookingDoctorPageWithoutFiles);
  router.post('/booking-doctor-normal/create', _homeController["default"].postBookingDoctorPageNormal);
  router.get('/detail/post/:id', _homeController["default"].getDetailPostPage);
  router.get('/detail/clinic/:id', _homeController["default"].getDetailClinicPage);
  router.get('/booking-info/:id', _homeController["default"].getInfoBookingPage);
  router.get('/all-posts', _homeController["default"].getPostsWithPagination);
  router.get('/posts/search/', _homeController["default"].getPostSearch);
  router.get('/users/manage/specialization', _authController["default"].checkLoggedIn, _adminController["default"].getSpecializationPage);
  router.get('/users/manage/supporter', _authController["default"].checkLoggedIn, _adminController["default"].getSupporterPage);
  router.get('/users', _authController["default"].checkLoggedIn, _homeController["default"].getUserPage);
  router.get('/users/manage/bot', _authController["default"].checkLoggedIn, _adminController["default"].getManageBotPage);
  router.get('/users/manage/schedule-for-doctors', _authController["default"].checkLoggedIn, _adminController["default"].getManageCreateScheduleForDoctorsPage);
  router.get('/users/manage/doctor', _authController["default"].checkLoggedIn, _adminController["default"].getManageDoctor);
  router.get('/users/manage/doctor/create', _authController["default"].checkLoggedIn, _adminController["default"].getCreateDoctor);
  router.post('/admin/doctor/create', _authController["default"].checkLoggedIn, _adminController["default"].postCreateDoctor);
  router.get('/users/doctor/edit/:id', _authController["default"].checkLoggedIn, _adminController["default"].getEditDoctor);
  router.put('/admin/doctor/update-without-file', _authController["default"].checkLoggedIn, _adminController["default"].putUpdateDoctorWithoutFile);
  router.put('/admin/doctor/update', _authController["default"].checkLoggedIn, _adminController["default"].putUpdateDoctor);
  router.get('/users/manage/clinic', _authController["default"].checkLoggedIn, _adminController["default"].getManageClinic);
  router.get('/users/manage/clinic/create', _authController["default"].checkLoggedIn, _adminController["default"].getCreateClinic);
  router.post('/admin/clinic/create', _authController["default"].checkLoggedIn, _adminController["default"].postCreateClinic);
  router.post('/admin/clinic/create-without-file', _authController["default"].checkLoggedIn, _adminController["default"].postCreateClinicWithoutFile);
  router.put('/admin/clinic/update-without-file', _authController["default"].checkLoggedIn, _adminController["default"].putUpdateClinicWithoutFile);
  router.put('/admin/clinic/update', _authController["default"].checkLoggedIn, _adminController["default"].putUpdateClinic);
  router.get('/users/clinic/edit/:id', _authController["default"].checkLoggedIn, _adminController["default"].getEditClinic);
  router.get('/doctor/manage/schedule', _doctorController["default"].getSchedule);
  router.get('/doctor/manage/schedule/create', _authController["default"].checkLoggedIn, _doctorController["default"].getCreateSchedule);
  router.post('/doctor/manage/schedule/create', _authController["default"].checkLoggedIn, _doctorController["default"].postCreateSchedule);
  router.post('/doctor/get-schedule-doctor-by-date', _doctorController["default"].getScheduleDoctorByDate);
  router.get('/doctor/manage/appointment', _authController["default"].checkLoggedIn, _doctorController["default"].getManageAppointment);
  router.get('/doctor/manage/chart', _authController["default"].checkLoggedIn, _doctorController["default"].getManageChart);
  router.post('/doctor/manage/create-chart', _authController["default"].checkLoggedIn, _doctorController["default"].postCreateChart);
  router.post('/doctor/send-forms-to-patient', _authController["default"].checkLoggedIn, _doctorController["default"].postSendFormsToPatient);
  router.post('/doctor/auto-create-all-doctors-schedule', _authController["default"].checkLoggedIn, _doctorController["default"].postAutoCreateAllDoctorsSchedule);
  router.get('/supporter/manage/customers', _authController["default"].checkLoggedIn, _supporterController["default"].getManageCustomersPage);
  router.get('/supporter/get-new-patients', _authController["default"].checkLoggedIn, _supporterController["default"].getNewPatients);
  router.get('/supporter/manage/posts', _authController["default"].checkLoggedIn, _supporterController["default"].getManagePosts);
  router.get('/supporter/pagination/posts', _supporterController["default"].getPostsPagination);
  router.get('/supporter/post/edit/:id', _authController["default"].checkLoggedIn, _adminController["default"].getEditPost);
  router.put('/supporter/post/update', _authController["default"].checkLoggedIn, _adminController["default"].putUpdatePost);
  router.get('/supporter/manage/post/create', _authController["default"].checkLoggedIn, _supporterController["default"].getCreatePost);
  router.post('/supporter/manage/post/create', _authController["default"].checkLoggedIn, _supporterController["default"].postCreatePost);
  router.get('/supporter/get-list-posts', _authController["default"].checkLoggedIn, _supporterController["default"].getAllPosts);
  router.post('/supporter/get-patients-for-tabs', _authController["default"].checkLoggedIn, _supporterController["default"].getForPatientsTabs);
  router.post('/supporter/change-status-patient', _authController["default"].checkLoggedIn, _supporterController["default"].postChangeStatusPatient);
  router.post('/supporter/get-logs-patient', _authController["default"].checkLoggedIn, _supporterController["default"].getLogsPatient);
  router.post('/supporter/done-comment', _authController["default"].checkLoggedIn, _supporterController["default"].postDoneComment);
  router.post('/api/get-info-doctor-by-id', _doctorController["default"].getInfoDoctorById);
  router.post('/api/get-info-clinic-by-id', _clinicController["default"].getInfoClinicById);
  router.post('/api/get-detail-patient-by-id', _homeController["default"].getDetailPatientBooking);
  router["delete"]('/admin/delete/clinic', _authController["default"].checkLoggedIn, _adminController["default"].deleteClinicById);
  router["delete"]('/admin/delete/doctor', _authController["default"].checkLoggedIn, _adminController["default"].deleteDoctorById);
  router["delete"]('/admin/delete/specialization', _authController["default"].checkLoggedIn, _adminController["default"].deleteSpecializationById);
  router["delete"]('/admin/delete/post', _authController["default"].checkLoggedIn, _adminController["default"].deletePostById);
  router.get("/login", _authController["default"].checkLoggedOut, _authController["default"].getLogin);
  router.post('/login', function (req, res, next) {
    _passport["default"].authenticate('local', function (err, user, info) {
      if (err) {
        return next(err);
      }
      // Redirect if it fails
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        req.session.save(function () {
          // Redirect if it succeeds
          return res.redirect('/users');
        });
      });
    })(req, res, next);
  });
  router.get('/register', _authController["default"].getRegister);
  router.post("/register", _authController["default"].postRegister);
  // router.get("/verify/:token", auth.verifyAccount);

  router.get("/logout", _authController["default"].checkLoggedIn, _authController["default"].getLogout);
  router.post("/admin/statistical", _authController["default"].checkLoggedIn, _adminController["default"].getInfoStatistical);
  return app.use("/", router);
};
module.exports = initRoutes;