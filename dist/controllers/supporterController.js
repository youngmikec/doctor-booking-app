//"use strict";

var _homeService = _interopRequireDefault(require("../services/homeService.js"));
var _userService = _interopRequireDefault(require("../services/userService.js"));
var _supporterService = _interopRequireDefault(require("../services/supporterService.js"));
var _patientService = _interopRequireDefault(require("../services/patientService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// require('dotenv').config();
require('dotenv').config();
var statusNewId = 4;
var statusPendingId = 3;
var statusFailedId = 2;
var statusSuccessId = 1;
var getNewPatients = function getNewPatients(req, res) {
  //render data = js/ getForPatientsTabs
  return res.render('main/users/admins/managePatient.ejs', {
    user: req.user
  });
};
var getAllPosts = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _supporterService["default"].getAllPosts();
          case 3:
            posts = _context.sent;
            return _context.abrupt("return", res.status(200).json({
              "data": posts
            }));
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json(_context.t0));
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function getAllPosts(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getCreatePost = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var clinics, doctors, specializations;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _homeService["default"].getClinics();
          case 2:
            clinics = _context2.sent;
            _context2.next = 5;
            return _userService["default"].getInfoDoctors();
          case 5:
            doctors = _context2.sent;
            _context2.next = 8;
            return _homeService["default"].getSpecializations();
          case 8:
            specializations = _context2.sent;
            return _context2.abrupt("return", res.render('main/users/admins/createPost.ejs', {
              user: req.user,
              clinics: clinics,
              doctors: doctors,
              specializations: specializations
            }));
          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getCreatePost(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var postCreatePost = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var item, post;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            item = req.body;
            item.writerId = req.user.id;
            item.createdAt = Date.now();
            _context3.next = 6;
            return _supporterService["default"].postCreatePost(item);
          case 6:
            post = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              status: 1,
              message: post
            }));
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(500).json(_context3.t0));
          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return function postCreatePost(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getManagePosts = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var role, object;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            role = "";
            if (req.user) {
              if (req.user.roleId === 1) role = "admin";
            }
            _context4.next = 5;
            return _supporterService["default"].getPostsPagination(1, +process.env.LIMIT_GET_POST, role);
          case 5:
            object = _context4.sent;
            return _context4.abrupt("return", res.render('main/users/admins/managePost.ejs', {
              user: req.user,
              posts: object.posts,
              total: object.total
            }));
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            return _context4.abrupt("return", res.status(500).json(_context4.t0));
          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));
  return function getManagePosts(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getPostsPagination = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var page, limit, object;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            page = +req.query.page;
            limit = +process.env.LIMIT_GET_POST;
            if (!page) {
              page = 1;
            }
            _context5.next = 6;
            return _supporterService["default"].getPostsPagination(page, limit);
          case 6:
            object = _context5.sent;
            return _context5.abrupt("return", res.status(200).json(object));
          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            return _context5.abrupt("return", res.status(500).json(_context5.t0));
          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));
  return function getPostsPagination(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getForPatientsTabs = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var object;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _patientService["default"].getForPatientsTabs();
          case 3:
            object = _context6.sent;
            return _context6.abrupt("return", res.status(200).json({
              'message': 'success',
              'object': object
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
  return function getForPatientsTabs(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var postChangeStatusPatient = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, status, statusId, content, data, logs, patient;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            id = req.body.patientId;
            status = req.body.status;
            statusId = '';
            content = '';
            if (status === 'pending') {
              statusId = statusPendingId;
              content = "New appointments have been received";
            } else if (status === 'failed') {
              statusId = statusFailedId;
              if (req.body.reason) {
                content = "Cancel with reason - ".concat(req.body.reason);
              }
            } else if (status === 'confirmed') {
              statusId = statusSuccessId;
              content = "The appointment has been successfully booked";
            }
            data = {
              id: id,
              statusId: statusId,
              updatedAt: Date.now()
            };
            logs = {
              supporterId: req.user.id,
              patientId: id,
              content: content
            };
            _context7.next = 10;
            return _patientService["default"].changeStatusPatient(data, logs);
          case 10:
            patient = _context7.sent;
            return _context7.abrupt("return", res.status(200).json({
              'message': 'success',
              'patient': patient
            }));
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);
            return _context7.abrupt("return", res.status(500).json(_context7.t0));
          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 14]]);
  }));
  return function postChangeStatusPatient(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getManageCustomersPage = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var comments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return _patientService["default"].getComments();
          case 3:
            comments = _context8.sent;
            return _context8.abrupt("return", res.render("main/users/admins/manageCustomer.ejs", {
              user: req.user,
              comments: comments
            }));
          case 7:
            _context8.prev = 7;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);
          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 7]]);
  }));
  return function getManageCustomersPage(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getLogsPatient = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var logs;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _patientService["default"].getLogsPatient(req.body.patientId);
          case 3:
            logs = _context9.sent;
            return _context9.abrupt("return", res.status(200).json(logs));
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
  return function getLogsPatient(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var postDoneComment = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var comment;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return _supporterService["default"].doneComment(req.body.commentId);
          case 3:
            comment = _context10.sent;
            return _context10.abrupt("return", res.status(200).json(comment));
          case 7:
            _context10.prev = 7;
            _context10.t0 = _context10["catch"](0);
            console.log(_context10.t0);
            return _context10.abrupt("return", res.status(500).json(_context10.t0));
          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function postDoneComment(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var supporter = {
  getNewPatients: getNewPatients,
  getManagePosts: getManagePosts,
  getCreatePost: getCreatePost,
  postCreatePost: postCreatePost,
  getAllPosts: getAllPosts,
  getPostsPagination: getPostsPagination,
  getForPatientsTabs: getForPatientsTabs,
  postChangeStatusPatient: postChangeStatusPatient,
  getManageCustomersPage: getManageCustomersPage,
  getLogsPatient: getLogsPatient,
  postDoneComment: postDoneComment
};
module.exports = supporter;