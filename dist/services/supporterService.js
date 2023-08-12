//"use strict";

var _index = _interopRequireDefault(require("../models/index.js"));
var _removeMarkdown = _interopRequireDefault(require("remove-markdown"));
var _syncsElaticService = _interopRequireDefault(require("./syncsElaticService.js"));
var _client = _interopRequireDefault(require("../helper/client.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var getAllPosts = function getAllPosts() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _index["default"].Post.findAll({
                attributes: ['id', 'title', 'writerId', 'createdAt']
              });
            case 3:
              posts = _context2.sent;
              _context2.next = 6;
              return Promise.all(posts.map( /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(post) {
                  var supporter, dateClient;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _client["default"].getSupporterById(post.writerId);
                        case 2:
                          supporter = _context.sent;
                          dateClient = _client["default"].convertDateClient(post.createdAt);
                          post.setDataValue('writerName', supporter.name);
                          post.setDataValue('dateClient', dateClient);
                          return _context.abrupt("return", post);
                        case 7:
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
            case 6:
              resolve(posts);
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);
            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var postCreatePost = function postCreatePost(item) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var post, plainText, data;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _index["default"].Post.create(item);
            case 3:
              post = _context3.sent;
              if (!(item.forDoctorId === '-1' && item.forClinicId === '-1' && item.forClinicId === '-1')) {
                _context3.next = 10;
                break;
              }
              plainText = (0, _removeMarkdown["default"])(item.contentMarkdown);
              plainText.replace(/(?:\r\n|\r|\\n)/g, ' ');
              data = {
                'postId': post.id,
                'writerId': post.writerId,
                'title': item.title,
                'content': plainText
              };
              _context3.next = 10;
              return _syncsElaticService["default"].createPost(data);
            case 10:
              resolve(post);
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
    return function (_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getDetailPostPage = function getDetailPostPage(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      var post;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _index["default"].Post.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'title', 'contentHTML', 'contentMarkdown', 'forDoctorId', 'forSpecializationId', 'forClinicId']
              });
            case 3:
              post = _context4.sent;
              if (!post) {
                reject("Can't get post with id=".concat(id));
              }
              resolve(post);
              _context4.next = 11;
              break;
            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              reject(_context4.t0);
            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 8]]);
    }));
    return function (_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getAllSupporters = function getAllSupporters() {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      var supporters;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _index["default"].User.findAll({
                where: {
                  roleId: 3
                }
              });
            case 3:
              supporters = _context5.sent;
              resolve(supporters);
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
var getPostsPagination = function getPostsPagination(page, limit, role) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var posts, total;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              posts = ""; //only get bài đăng y khoa
              if (!(role === "admin")) {
                _context7.next = 8;
                break;
              }
              _context7.next = 5;
              return _index["default"].Post.findAndCountAll({
                offset: (page - 1) * limit,
                limit: limit,
                attributes: ['id', 'title', 'contentMarkdown', 'contentHTML', 'createdAt', 'writerId'],
                order: [['createdAt', 'DESC']]
              });
            case 5:
              posts = _context7.sent;
              _context7.next = 11;
              break;
            case 8:
              _context7.next = 10;
              return _index["default"].Post.findAndCountAll({
                where: {
                  forDoctorId: -1,
                  forSpecializationId: -1,
                  forClinicId: -1
                },
                offset: (page - 1) * limit,
                limit: limit,
                attributes: ['id', 'title', 'contentMarkdown', 'contentHTML', 'createdAt', 'writerId'],
                order: [['createdAt', 'DESC']]
              });
            case 10:
              posts = _context7.sent;
            case 11:
              total = Math.ceil(posts.count / limit);
              _context7.next = 14;
              return Promise.all(posts.rows.map( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(post) {
                  var supporter, dateClient;
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return _client["default"].getSupporterById(post.writerId);
                        case 2:
                          supporter = _context6.sent;
                          dateClient = _client["default"].convertDateClient(post.createdAt);
                          post.setDataValue('writerName', supporter.name);
                          post.setDataValue('dateClient', dateClient);
                          return _context6.abrupt("return", post);
                        case 7:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));
                return function (_x12) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 14:
              resolve({
                posts: posts,
                total: total
              });
              _context7.next = 20;
              break;
            case 17:
              _context7.prev = 17;
              _context7.t0 = _context7["catch"](0);
              reject(_context7.t0);
            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 17]]);
    }));
    return function (_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var deletePostById = function deletePostById(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
      var post;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _index["default"].Post.findOne({
                where: {
                  id: id
                },
                attributes: ['id', 'forDoctorId', 'forSpecializationId', 'forClinicId']
              });
            case 3:
              post = _context8.sent;
              if (!(post.forDoctorId === -1 && post.forClinicId === -1 && post.forClinicId === -1)) {
                _context8.next = 7;
                break;
              }
              _context8.next = 7;
              return _syncsElaticService["default"].deletePost(post.id);
            case 7:
              _context8.next = 9;
              return post.destroy();
            case 9:
              resolve(true);
              _context8.next = 15;
              break;
            case 12:
              _context8.prev = 12;
              _context8.t0 = _context8["catch"](0);
              reject(_context8.t0);
            case 15:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 12]]);
    }));
    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var putUpdatePost = function putUpdatePost(item) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var post, plainText, data;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _index["default"].Post.findOne({
                where: {
                  id: item.id
                },
                attributes: ['id', 'forDoctorId', 'forSpecializationId', 'forClinicId']
              });
            case 3:
              post = _context9.sent;
              _context9.next = 6;
              return post.update(item);
            case 6:
              if (!(item.forDoctorId === '-1' && item.forClinicId === '-1' && item.forClinicId === '-1')) {
                _context9.next = 12;
                break;
              }
              plainText = (0, _removeMarkdown["default"])(item.contentMarkdown);
              plainText.replace(/(?:\r\n|\r|\\n)/g, ' ');
              data = {
                'postId': post.id,
                'writerId': post.writerId,
                'title': item.title,
                'content': plainText
              };
              _context9.next = 12;
              return _syncsElaticService["default"].updatePost(data);
            case 12:
              resolve(true);
              _context9.next = 18;
              break;
            case 15:
              _context9.prev = 15;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 18:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 15]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var doneComment = function doneComment(id) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      var comment;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _index["default"].Comment.findOne({
                where: {
                  id: id
                }
              });
            case 3:
              comment = _context10.sent;
              _context10.next = 6;
              return comment.update({
                status: true
              });
            case 6:
              resolve(comment);
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
    return function (_x17, _x18) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var supporterService = {
  postCreatePost: postCreatePost,
  getAllPosts: getAllPosts,
  getDetailPostPage: getDetailPostPage,
  getAllSupporters: getAllSupporters,
  getPostsPagination: getPostsPagination,
  deletePostById: deletePostById,
  putUpdatePost: putUpdatePost,
  doneComment: doneComment
};
module.exports = supporterService;