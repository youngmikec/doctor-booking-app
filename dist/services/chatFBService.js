//"use strict";

var _request = _interopRequireDefault(require("request"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// require('dotenv').config();
require('dotenv').config();
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
var WIT_SERVER_TOKEN = process.env.WIT_AI_SERVER_TOKEN;
var WEBVIEW_URL = process.env.WEBVIEW_URL;
var DOCTOR_IMAGE_URL = "https://bralowmedicalgroup.com/wp-content/uploads/2018/06/blog.jpg";
var DOCTOR_URL = "https://doctorcare-v1.herokuapp.com/";
var BOOKING_IMAGE_URL = "http://ipright.vn/wp-content/uploads/2014/03/36322201-procedure-word-write-on-paper-Stock-Photo-1200x545_c.jpg";
var BOOKING_URL = "https://doctorcare-v1.herokuapp.com/";
var COXUONGKHOP_IMAGE_URL = "https://cdn.pixabay.com/photo/2015/10/31/11/59/information-1015298_960_720.jpg";
var COXUONGKHOP_URL = "https://doctorcare-v1.herokuapp.com/";
var TIEUHOA_IMAGE_URL = "https://cdn.pixabay.com/photo/2015/10/31/11/59/information-1015298_960_720.jpg";
var TIEUHOA_URL = "https://doctorcare-v1.herokuapp.com/";
var INFOWEBSITE_IMAGE_URL = "https://cdn.pixabay.com/photo/2015/10/31/11/59/information-1015298_960_720.jpg";
var INFOWEBSITE_URL = "https://doctorcare-v1.herokuapp.com/";
var DEFAULT_IMAGE_URL = "https://www.freseniusmedicalcare.com.vn/fileadmin/_processed_/5/4/csm_SPE001_service-support-employee_7614d83ad5.jpg";
var DEFAULT_URL = "https://doctorcare-v1.herokuapp.com/";
var handlePostback = function handlePostback(sender_psid, received_postback) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      var response, payload, username, text;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              payload = received_postback.payload; // Set the response based on the postback payload
              _context.t0 = payload;
              _context.next = _context.t0 === "GET_STARTED" ? 5 : _context.t0 === "RESTART_CONVERSATION" ? 5 : _context.t0 === "DOCTORS" ? 13 : _context.t0 === "CLINICS" ? 16 : _context.t0 === "SPECIALIZATION" ? 19 : _context.t0 === "ALL_DOCTORS" ? 22 : _context.t0 === "ALL_CLINICS" ? 25 : _context.t0 === "ALL_SPECIALIZATION" ? 28 : _context.t0 === "CUSTOMER_SERVICE" ? 31 : _context.t0 === "BOOKING_MESSENGER" ? 34 : _context.t0 === "BACK" ? 37 : _context.t0 === "yes" ? 40 : _context.t0 === "no" ? 45 : 50;
              break;
            case 5:
              _context.next = 7;
              return getFacebookUsername(sender_psid);
            case 7:
              username = _context.sent;
              text = "Xin ch\xE0o ".concat(username, ". M\xECnh l\xE0 chat bot h\u1ED7 tr\u1EE3 Doctor Care. B\u1EA1n c\u1EA7n m\xECnh gi\xFAp g\xEC n\xE0o?");
              _context.next = 11;
              return sendMessageDefault(sender_psid, text);
            case 11:
              resolve("OK");
              return _context.abrupt("break", 51);
            case 13:
              _context.next = 15;
              return sendMessageReplyDoctors(sender_psid);
            case 15:
              return _context.abrupt("break", 51);
            case 16:
              _context.next = 18;
              return sendMessageReplyClinics(sender_psid);
            case 18:
              return _context.abrupt("break", 51);
            case 19:
              _context.next = 21;
              return sendMessageReplySpecialization(sender_psid);
            case 21:
              return _context.abrupt("break", 51);
            case 22:
              _context.next = 24;
              return sendMessageAllDoctors(sender_psid);
            case 24:
              return _context.abrupt("break", 51);
            case 25:
              _context.next = 27;
              return sendMessageAllClinics(sender_psid);
            case 27:
              return _context.abrupt("break", 51);
            case 28:
              _context.next = 30;
              return sendMessageAllSpecializations(sender_psid);
            case 30:
              return _context.abrupt("break", 51);
            case 31:
              _context.next = 33;
              return chatWithCustomerService(sender_psid);
            case 33:
              return _context.abrupt("break", 51);
            case 34:
              _context.next = 36;
              return sendMessageBooking(sender_psid);
            case 36:
              return _context.abrupt("break", 51);
            case 37:
              _context.next = 39;
              return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
            case 39:
              return _context.abrupt("break", 51);
            case 40:
              response = "Thanks!";
              // Send the message to acknowledge the postback
              _context.next = 43;
              return callSendAPI(sender_psid, response);
            case 43:
              resolve("OK");
              return _context.abrupt("break", 51);
            case 45:
              response = "Oops, try sending another image.";
              // Send the message to acknowledge the postback
              _context.next = 48;
              return callSendAPI(sender_psid, response);
            case 48:
              resolve("OK");
              return _context.abrupt("break", 51);
            case 50:
              console.log("Something wrong with switch case payload");
            case 51:
              _context.next = 56;
              break;
            case 53:
              _context.prev = 53;
              _context.t1 = _context["catch"](0);
              reject(_context.t1);
            case 56:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 53]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var callSendAPI = function callSendAPI(sender_psid, message) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var request_body;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return markMessageSeen(sender_psid);
            case 3:
              _context2.next = 5;
              return sendTypingOn(sender_psid);
            case 5:
              // Construct the message body
              request_body = {
                "recipient": {
                  "id": sender_psid
                },
                "message": {
                  "text": message
                }
              }; // Send the HTTP request to the Messenger Platform
              (0, _request["default"])({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {
                  "access_token": PAGE_ACCESS_TOKEN
                },
                "method": "POST",
                "json": request_body
              }, function (err, res, body) {
                if (!err) {
                  resolve("ok");
                } else {
                  reject("Unable to send message:" + err);
                }
              });
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
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var callSendAPIv2 = function callSendAPIv2(sender_psid, title, subtitle, imageUrl, redirectUrl) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      var body;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return markMessageSeen(sender_psid);
            case 3:
              _context3.next = 5;
              return sendTypingOn(sender_psid);
            case 5:
              body = {
                "recipient": {
                  "id": sender_psid
                },
                "message": {
                  "attachment": {
                    "type": "template",
                    "payload": {
                      "template_type": "generic",
                      "elements": [{
                        "title": title,
                        "image_url": imageUrl,
                        "subtitle": subtitle,
                        "default_action": {
                          "type": "web_url",
                          "url": redirectUrl,
                          "webview_height_ratio": "tall"
                        },
                        "buttons": [{
                          "type": "web_url",
                          "url": redirectUrl,
                          "title": "Xem chi tiết"
                        }, {
                          "type": "phone_number",
                          "title": "Gọi hotline",
                          "payload": "+8498549864"
                        }]
                      }]
                    }
                  }
                }
              };
              (0, _request["default"])({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {
                  "access_token": PAGE_ACCESS_TOKEN
                },
                "method": "POST",
                "json": body
              }, function (err, res, body) {
                if (!err) {
                  resolve("ok");
                } else {
                  reject("Unable to send message:" + err);
                }
              });
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
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var firstEntity = function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
};
var handleMessage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(sender_psid, received_message) {
    var payload, name, entityCheck, arrPossibleEntity, i, entity;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!received_message.sticker_id) {
              _context4.next = 4;
              break;
            }
            _context4.next = 3;
            return callSendAPI(sender_psid, "Cảm ơn bạn đã sử dụng dịch vụ của Doctors Care !!!");
          case 3:
            return _context4.abrupt("return");
          case 4:
            if (!(received_message && received_message.quick_reply && received_message.quick_reply.payload)) {
              _context4.next = 28;
              break;
            }
            payload = received_message.quick_reply.payload;
            if (!(payload === "KHAM_BENH")) {
              _context4.next = 12;
              break;
            }
            _context4.next = 9;
            return sendMessageMedicalExamination(sender_psid);
          case 9:
            return _context4.abrupt("return");
          case 12:
            if (!(payload === "DOCTORS")) {
              _context4.next = 18;
              break;
            }
            _context4.next = 15;
            return sendMessageReplyDoctors(sender_psid);
          case 15:
            return _context4.abrupt("return");
          case 18:
            if (!(payload === "CLINICS")) {
              _context4.next = 24;
              break;
            }
            _context4.next = 21;
            return sendMessageReplyClinics(sender_psid);
          case 21:
            return _context4.abrupt("return");
          case 24:
            if (!(payload === "SPECIALIZATION")) {
              _context4.next = 28;
              break;
            }
            _context4.next = 27;
            return sendMessageReplySpecialization(sender_psid);
          case 27:
            return _context4.abrupt("return");
          case 28:
            name = "";
            entityCheck = {};
            arrPossibleEntity = ['intent', 'booking', 'info'];
            i = 0;
          case 32:
            if (!(i < arrPossibleEntity.length)) {
              _context4.next = 41;
              break;
            }
            entity = firstEntity(received_message.nlp, arrPossibleEntity[i]);
            if (!(entity && entity.confidence > 0.8)) {
              _context4.next = 38;
              break;
            }
            name = arrPossibleEntity[i];
            entityCheck = entity;
            return _context4.abrupt("break", 41);
          case 38:
            i++;
            _context4.next = 32;
            break;
          case 41:
            _context4.next = 43;
            return handleEntity(name, sender_psid, entityCheck);
          case 43:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function handleMessage(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var handleEntity = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(name, sender_psid, entity) {
    var title, subtitle, _title, _subtitle, _title2, _subtitle2;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.t0 = name;
            _context5.next = _context5.t0 === "intent" ? 3 : _context5.t0 === "booking" ? 31 : _context5.t0 === "info" ? 38 : 45;
            break;
          case 3:
            if (!(entity.value === 'doctors')) {
              _context5.next = 12;
              break;
            }
            _context5.next = 6;
            return callSendAPI(sender_psid, "Bạn đang tìm kiếm thông tin về bác sĩ, xem thêm ở link bên dưới nhé.");
          case 6:
            title = "Doctors Care";
            subtitle = 'Thông tin bác sĩ làm việc tại Doctors Care';
            _context5.next = 10;
            return callSendAPIv2(sender_psid, title, subtitle, DOCTOR_IMAGE_URL, DOCTOR_URL);
          case 10:
            _context5.next = 12;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 12:
            if (!(entity.value === 'tiêu hóa')) {
              _context5.next = 21;
              break;
            }
            _context5.next = 15;
            return callSendAPI(sender_psid, "Bạn đang gặp vấn đề về bệnh đường tiêu hóa, xem thêm danh sách bác sĩ chuyên khoa TIÊU HÓA.");
          case 15:
            _title = "Chuyên khoa khám bệnh";
            _subtitle = 'Thông tin bác sĩ chuyên khoa tiêu hóa';
            _context5.next = 19;
            return callSendAPIv2(sender_psid, _title, _subtitle, TIEUHOA_IMAGE_URL, TIEUHOA_URL);
          case 19:
            _context5.next = 21;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 21:
            if (!(entity.value === 'cơ-xương-khớp')) {
              _context5.next = 30;
              break;
            }
            _context5.next = 24;
            return callSendAPI(sender_psid, "Bạn đang gặp vấn đề về cơ-xương-khớp, xem thêm danh sách bác sĩ chuyên khoa CƠ XƯƠNG KHỚP.");
          case 24:
            _title2 = "Chuyên khoa khám bệnh";
            _subtitle2 = 'Thông tin bác sĩ chuyên khoa cơ-xương-khớp';
            _context5.next = 28;
            return callSendAPIv2(sender_psid, _title2, _subtitle2, COXUONGKHOP_IMAGE_URL, COXUONGKHOP_URL);
          case 28:
            _context5.next = 30;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 30:
            return _context5.abrupt("break", 51);
          case 31:
            _context5.next = 33;
            return callSendAPI(sender_psid, "Bạn đang cần đặt lịch khám bệnh, xem thêm hướng dẫn đặt lịch chi tiết ở link bên dưới nhé.");
          case 33:
            _context5.next = 35;
            return callSendAPIv2(sender_psid, "Đặt lịch khám bệnh", "Hướng dẫn đặt lịch khám bệnh tại Doctors Care", BOOKING_IMAGE_URL, BOOKING_URL);
          case 35:
            _context5.next = 37;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 37:
            return _context5.abrupt("break", 51);
          case 38:
            _context5.next = 40;
            return callSendAPI(sender_psid, "Bạn đang tìm hiểu về thông tin website, xem thêm ở link bên dưới nhé.");
          case 40:
            _context5.next = 42;
            return callSendAPIv2(sender_psid, "Thông tin website", "Thông tin website Doctors care", INFOWEBSITE_IMAGE_URL, INFOWEBSITE_URL);
          case 42:
            _context5.next = 44;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 44:
            return _context5.abrupt("break", 51);
          case 45:
            _context5.next = 47;
            return callSendAPI(sender_psid, "Rất tiếc bot chưa được hướng dẫn để trả lời câu hỏi của bạn. Để được hỗ trợ, vui lòng truy câp:");
          case 47:
            _context5.next = 49;
            return callSendAPIv2(sender_psid, "Hỗ trợ khách hàng", "Thông tin hỗ trợ khách hàng Doctors care", DEFAULT_IMAGE_URL, DEFAULT_URL);
          case 49:
            _context5.next = 51;
            return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
          case 51:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function handleEntity(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();
var getWitEntities = function getWitEntities() {
  return new Promise(function (resolve, reject) {
    try {
      (0, _request["default"])({
        "uri": "https://api.wit.ai/entities",
        "method": "GET",
        "auth": {
          'bearer': WIT_SERVER_TOKEN
        }
      }, function (err, res, body) {
        if (!err) {
          var result = JSON.parse(body);
          var arr = [];
          for (var _i = 0, _Object$entries = Object.entries(result); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];
            // arr.push(value)

            arr.push(value.name);
          }
          // new wit update, tạm thời comment lại
          // let userEntity = arr.filter(e => {
          //     return e.indexOf("wit") !== 0;
          // });
          // resolve(userEntity);
          resolve(arr);
        } else {
          reject(err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
var getEntityByName = function getEntityByName(name) {
  return new Promise(function (resolve, reject) {
    try {
      (0, _request["default"])({
        "uri": "https://api.wit.ai/entities/".concat(name, "?v=20170307"),
        "method": "GET",
        "auth": {
          'bearer': WIT_SERVER_TOKEN
        }
      }, function (err, res, body) {
        if (!err) {
          resolve(body);
        } else {
          reject(err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
var getWitEntitiesWithExpression = function getWitEntitiesWithExpression() {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      var entities, result;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return getWitEntities();
            case 3:
              entities = _context7.sent;
              result = [];
              _context7.next = 7;
              return Promise.all(entities.map( /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name) {
                  var b;
                  return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return getEntityByName(name);
                        case 2:
                          b = _context6.sent;
                          result.push(JSON.parse(b));
                        case 4:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));
                return function (_x14) {
                  return _ref7.apply(this, arguments);
                };
              }()));
            case 7:
              resolve(result);
              _context7.next = 13;
              break;
            case 10:
              _context7.prev = 10;
              _context7.t0 = _context7["catch"](0);
              reject(_context7.t0);
            case 13:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 10]]);
    }));
    return function (_x12, _x13) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var handleSetupBotFBPage = function handleSetupBotFBPage() {
  return new Promise(function (resolve, reject) {
    var data = {
      "get_started": {
        "payload": "GET_STARTED"
      },
      "persistent_menu": [{
        "locale": "default",
        "composer_input_disabled": false,
        "call_to_actions": [{
          "type": "postback",
          "title": "Chăm sóc khách hàng",
          "payload": "CUSTOMER_SERVICE"
        }, {
          "type": "postback",
          "title": "Restart hội thoại",
          "payload": "RESTART_CONVERSATION"
        }, {
          "type": "nested",
          "title": "Thông tin",
          "call_to_actions": [{
            "type": "web_url",
            "title": "Xem website",
            "url": "https://doctorcare-v1.herokuapp.com",
            "webview_height_ratio": "full"
          }, {
            "type": "postback",
            "title": "Đặt lịch (thử nghiệm)",
            "payload": "BOOKING_MESSENGER"
          }]
        }]
      }],
      "whitelisted_domains": ["https://doctorcare-v1.herokuapp.com/"]
    };
    (0, _request["default"])({
      "uri": "https://graph.facebook.com/v6.0/me/messenger_profile?access_token=".concat(process.env.PAGE_ACCESS_TOKEN),
      "method": "POST",
      "json": data
    }, function (err, res, body) {
      if (!err) {
        resolve("Done!");
      } else {
        reject(err);
      }
    });
  });
};
var getFacebookUsername = function getFacebookUsername(sender_psid) {
  return new Promise(function (resolve, reject) {
    // Send the HTTP request to the Messenger Platform
    var uri = "https://graph.facebook.com/".concat(sender_psid, "?fields=first_name,last_name,profile_pic&access_token=").concat(PAGE_ACCESS_TOKEN);
    (0, _request["default"])({
      "uri": uri,
      "method": "GET"
    }, function (err, res, body) {
      if (!err) {
        //convert string to json object
        body = JSON.parse(body);
        var username = "".concat(body.last_name, " ").concat(body.first_name);
        resolve(username);
      } else {
        reject("Unable to send message:" + err);
      }
    });
  });
};
var sendMessage = function sendMessage(sender_psid, response) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
      var request_body;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return markMessageSeen(sender_psid);
            case 3:
              _context8.next = 5;
              return sendTypingOn(sender_psid);
            case 5:
              // Construct the message body
              request_body = {
                "recipient": {
                  "id": sender_psid
                },
                "message": response
              }; // Send the HTTP request to the Messenger Platform
              (0, _request["default"])({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": {
                  "access_token": PAGE_ACCESS_TOKEN
                },
                "method": "POST",
                "json": request_body
              }, function (err, res, body) {
                console.log(body);
                if (!err) {
                  resolve("ok");
                } else {
                  reject(err);
                }
              });
              _context8.next = 12;
              break;
            case 9:
              _context8.prev = 9;
              _context8.t0 = _context8["catch"](0);
              reject(_context8.t0);
            case 12:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 9]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var markMessageSeen = function markMessageSeen(sender_psid) {
  return new Promise(function (resolve, reject) {
    try {
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "sender_action": "mark_seen"
      };

      // Send the HTTP request to the Messenger Platform
      (0, _request["default"])({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": {
          "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
      }, function (err, res, body) {
        if (!err) {
          resolve('done!');
        } else {
          reject("Unable to send message:" + err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
var sendTypingOn = function sendTypingOn(sender_psid) {
  return new Promise(function (resolve, reject) {
    try {
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "sender_action": "typing_on"
      };

      // Send the HTTP request to the Messenger Platform
      (0, _request["default"])({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": {
          "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
      }, function (err, res, body) {
        if (!err) {
          resolve('done!');
        } else {
          reject("Unable to send message:" + err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
var sendMessageMedicalExamination = function sendMessageMedicalExamination(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      var response1, response2, response3;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              response1 = {
                "text": "Quy trình khám bệnh với Doctor Care gồm những bước sau:" + "\n\n1. Bệnh nhân lựa chọn bác sĩ khám bệnh từ website." + "\n\n2. Bệnh nhân điền thông tin, chọn lịch khám và xác nhận đặt lịch." + "\n\n3. Nhân viên hỗ trợ gọi điện xác nhận lịch hẹn." + "\n\n4. Bệnh nhân đến khám bệnh tại cơ sở y tế, phòng khám đã đặt lịch."
              };
              response2 = {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "button",
                    "text": "Để được hỗ trợ thông tin cũng như đặt lịch khám bệnh online," + "vui lòng liên hệ tổng đài: 1900.000.111",
                    "buttons": [{
                      "type": "phone_number",
                      "title": "GỌI HOTLINE",
                      "payload": "+8498549864"
                    }]
                  }
                }
              };
              response3 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }]
              };
              _context9.next = 6;
              return sendMessage(sender_psid, response1);
            case 6:
              _context9.next = 8;
              return sendMessage(sender_psid, response2);
            case 8:
              _context9.next = 10;
              return sendMessage(sender_psid, response3);
            case 10:
              resolve("ok");
              _context9.next = 16;
              break;
            case 13:
              _context9.prev = 13;
              _context9.t0 = _context9["catch"](0);
              reject(_context9.t0);
            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 13]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var sendMessageReplyDoctors = function sendMessageReplyDoctors(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      var response1, response2, response3;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              response1 = {
                "text": "Doctors Care tự hào mang đến cho bạn đội ngũ bác sĩ hàng đầu, chất lượng và uy tín." + "\n\nMột số bác sĩ tiêu biểu trên Doctors Care:"
              };
              response2 = {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": [{
                      "title": "GS.TS Phạm Văn Tuấn",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/users/doctor.jpg",
                      "subtitle": "Y học cổ truyền",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/doctor/2",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "GS.TS Hoàng Đình Tùng",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/users/doctor-hoang-dinh-tung.jpg",
                      "subtitle": "Cơ xương khớp",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/doctor/4",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "GS.TS Eric Pham",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/users/doctor-eric-pham.jpg",
                      "subtitle": "Tai mũi họng",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/doctor/5",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "Xem thêm thông tin:",
                      "image_url": " https://bit.ly/imageToSend",
                      "buttons": [{
                        "type": "postback",
                        "title": "Tất cả bác sĩ",
                        "payload": "ALL_DOCTORS"
                      }, {
                        "type": "postback",
                        "title": "Chuyên khoa",
                        "payload": "SPECIALIZATION"
                      }, {
                        "type": "postback",
                        "title": "Phòng khám",
                        "payload": "CLINICS"
                      }]
                    }]
                  }
                }
              };
              response3 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }, {
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }]
              };
              _context10.next = 6;
              return sendMessage(sender_psid, response1);
            case 6:
              _context10.next = 8;
              return sendMessage(sender_psid, response2);
            case 8:
              _context10.next = 10;
              return sendMessage(sender_psid, response3);
            case 10:
              resolve("ok");
              _context10.next = 16;
              break;
            case 13:
              _context10.prev = 13;
              _context10.t0 = _context10["catch"](0);
              reject(_context10.t0);
            case 16:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 13]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var sendMessageReplySpecialization = function sendMessageReplySpecialization(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(resolve, reject) {
      var response1, response2, response3;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              response1 = {
                "text": "Doctors Care có đầy đủ các chuyên khoa khám chữa bệnh cho mọi lứa tuổi." + "\n\nMột số chuyên khoa tiêu biểu trên Doctors Care:"
              };
              response2 = {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": [{
                      "title": "TAI MŨI HỌNG",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/specializations/tai-mui-hong.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/specialization/1",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "THẦN KINH",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/specializations/than-kinh.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/specialization/2",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "TIÊU HÓA",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/specializations/tieu-hoa.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/specialization/3",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "Xem thêm thông tin:",
                      "image_url": " https://bit.ly/imageToSend",
                      "buttons": [{
                        "type": "postback",
                        "title": "Tất cả chuyên khoa",
                        "payload": "ALL_SPECIALIZATION"
                      }, {
                        "type": "postback",
                        "title": "Phòng khám",
                        "payload": "SPECIALIZATION"
                      }, {
                        "type": "postback",
                        "title": "Bác sĩ",
                        "payload": "DOCTORS"
                      }]
                    }]
                  }
                }
              };
              response3 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }, {
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }]
              };
              _context11.next = 6;
              return sendMessage(sender_psid, response1);
            case 6:
              _context11.next = 8;
              return sendMessage(sender_psid, response2);
            case 8:
              _context11.next = 10;
              return sendMessage(sender_psid, response3);
            case 10:
              resolve("ok");
              _context11.next = 16;
              break;
            case 13:
              _context11.prev = 13;
              _context11.t0 = _context11["catch"](0);
              reject(_context11.t0);
            case 16:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 13]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var sendMessageReplyClinics = function sendMessageReplyClinics(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(resolve, reject) {
      var response1, response2, response3;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              response1 = {
                "text": "Doctors Care có trên 20 cơ sở y tế, phòng khám hợp tác phát triển." + "\n\nMột số phòng khám tiêu biểu trên Doctors Care:"
              };
              response2 = {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "generic",
                    "elements": [{
                      "title": "Phòng khám đa khoa Thu Cúc",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/clinics/phong-kham-thu-cuc.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/clinic/1",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "Phòng khám Meditec",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/clinics/phong-kham-meditec.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/clinic/2",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "Phòng khám quốc tế Bảo Sơn",
                      "image_url": "https://doctorcare-v1.herokuapp.com/images/clinics/phong-kham-bao-son.jpg",
                      "default_action": {
                        "type": "web_url",
                        "url": "https://doctorcare-v1.herokuapp.com/detail/clinic/3",
                        "webview_height_ratio": "tall"
                      }
                    }, {
                      "title": "Xem thêm thông tin:",
                      "image_url": " https://bit.ly/imageToSend",
                      "buttons": [{
                        "type": "postback",
                        "title": "Tất cả phòng khám",
                        "payload": "ALL_CLINICS"
                      }, {
                        "type": "postback",
                        "title": "Bác sĩ",
                        "payload": "DOCTORS"
                      }, {
                        "type": "postback",
                        "title": "Chuyên khoa",
                        "payload": "SPECIALIZATION"
                      }]
                    }]
                  }
                }
              };
              response3 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }, {
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }]
              };
              _context12.next = 6;
              return sendMessage(sender_psid, response1);
            case 6:
              _context12.next = 8;
              return sendMessage(sender_psid, response2);
            case 8:
              _context12.next = 10;
              return sendMessage(sender_psid, response3);
            case 10:
              resolve("ok");
              _context12.next = 16;
              break;
            case 13:
              _context12.prev = 13;
              _context12.t0 = _context12["catch"](0);
              reject(_context12.t0);
            case 16:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 13]]);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var sendMessageAllDoctors = function sendMessageAllDoctors(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(resolve, reject) {
      var response1, response2;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              response1 = {
                "text": "Danh sách tất cả bác sĩ bạn xem thêm ở link bên dưới nhé:" + "\n\n 👉 https://doctorcare-v1.herokuapp.com/all-doctors  "
              };
              response2 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }, {
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }]
              };
              _context13.next = 5;
              return sendMessage(sender_psid, response1);
            case 5:
              _context13.next = 7;
              return sendMessage(sender_psid, response2);
            case 7:
              resolve("ok");
              _context13.next = 13;
              break;
            case 10:
              _context13.prev = 10;
              _context13.t0 = _context13["catch"](0);
              reject(_context13.t0);
            case 13:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 10]]);
    }));
    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());
};
var sendMessageAllClinics = function sendMessageAllClinics(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(resolve, reject) {
      var response1, response2;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              response1 = {
                "text": "Danh sách tất cả phòng khám bạn xem thêm ở link bên dưới nhé:" + "\n\n 👉 https://doctorcare-v1.herokuapp.com/all-clinics  "
              };
              response2 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }, {
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }]
              };
              _context14.next = 5;
              return sendMessage(sender_psid, response1);
            case 5:
              _context14.next = 7;
              return sendMessage(sender_psid, response2);
            case 7:
              resolve("ok");
              _context14.next = 13;
              break;
            case 10:
              _context14.prev = 10;
              _context14.t0 = _context14["catch"](0);
              reject(_context14.t0);
            case 13:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 10]]);
    }));
    return function (_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var sendMessageAllSpecializations = function sendMessageAllSpecializations(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(resolve, reject) {
      var response1, response2;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              response1 = {
                "text": "Danh sách tất cả các chuyên khoa bạn xem thêm ở link bên dưới nhé:" + "\n\n 👉 https://doctorcare-v1.herokuapp.com/all-specializations  "
              };
              response2 = {
                "text": "Xem thêm thông tin:",
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }, {
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }]
              };
              _context15.next = 5;
              return sendMessage(sender_psid, response1);
            case 5:
              _context15.next = 7;
              return sendMessage(sender_psid, response2);
            case 7:
              resolve("ok");
              _context15.next = 13;
              break;
            case 10:
              _context15.prev = 10;
              _context15.t0 = _context15["catch"](0);
              reject(_context15.t0);
            case 13:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 10]]);
    }));
    return function (_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }());
};
var sendMessageDefault = function sendMessageDefault(sender_psid, text) {
  return new Promise( /*#__PURE__*/function () {
    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(resolve, reject) {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              res = {
                "text": text,
                "quick_replies": [{
                  "content_type": "text",
                  "title": "Khám bệnh",
                  "payload": "KHAM_BENH"
                }, {
                  "content_type": "text",
                  "title": "Bác sĩ",
                  "payload": "DOCTORS"
                }, {
                  "content_type": "text",
                  "title": "Phòng khám",
                  "payload": "CLINICS"
                }, {
                  "content_type": "text",
                  "title": "Chuyên khoa",
                  "payload": "SPECIALIZATION"
                }]
              };
              _context16.next = 4;
              return sendMessage(sender_psid, res);
            case 4:
              resolve("ok");
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
    return function (_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }());
};
var chatWithCustomerService = function chatWithCustomerService(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(resolve, reject) {
      var response1;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              //send a text message
              response1 = {
                "text": "Bạn đã lựa chọn chat với hỗ trợ viên chăm sóc khách hàng" + "\n Vui lòng để lại lời nhắn và chúng tôi sẽ phản hồi trong ít phút nữa." + "\n\nĐể bật lại bot trả lời tự động, nhập 'exit' hoặc 'back' và gửi tin nhắn."
              };
              _context17.next = 4;
              return sendMessage(sender_psid, response1);
            case 4:
              _context17.next = 6;
              return passThreadControl(sender_psid);
            case 6:
              resolve("done");
              _context17.next = 12;
              break;
            case 9:
              _context17.prev = 9;
              _context17.t0 = _context17["catch"](0);
              reject(_context17.t0);
            case 12:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 9]]);
    }));
    return function (_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }());
};
var passThreadControl = function passThreadControl(sender_psid) {
  return new Promise(function (resolve, reject) {
    try {
      // Construct the message body
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "target_app_id": "263902037430900",
        "metadata": "Pass thread control to inbox chat"
      };

      // Send the HTTP request to the Messenger Platform
      (0, _request["default"])({
        "uri": "https://graph.facebook.com/v6.0/me/pass_thread_control",
        "qs": {
          "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
      }, function (err, res, body) {
        console.log(body);
        if (!err) {
          resolve('message sent!');
        } else {
          reject("Unable to send message:" + err);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
var takeControlConversation = function takeControlConversation(sender_psid) {
  return new Promise(function (resolve, reject) {
    try {
      // Construct the message body
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "metadata": "Pass this conversation from page inbox to the bot - primary app"
      };

      // Send the HTTP request to the Messenger Platform
      (0, _request["default"])({
        "uri": "https://graph.facebook.com/v6.0/me/take_thread_control",
        "qs": {
          "access_token": PAGE_ACCESS_TOKEN
        },
        "method": "POST",
        "json": request_body
      }, /*#__PURE__*/function () {
        var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(err, res, body) {
          return regeneratorRuntime.wrap(function _callee18$(_context18) {
            while (1) {
              switch (_context18.prev = _context18.next) {
                case 0:
                  if (err) {
                    _context18.next = 8;
                    break;
                  }
                  _context18.next = 3;
                  return sendMessage(sender_psid, {
                    "text": "Bạn đã kích hoạt lại bot trả lời tự động."
                  });
                case 3:
                  _context18.next = 5;
                  return sendMessageDefault(sender_psid, "Xem thêm thông tin:");
                case 5:
                  resolve('message sent!');
                  _context18.next = 9;
                  break;
                case 8:
                  reject("Unable to send message:" + err);
                case 9:
                case "end":
                  return _context18.stop();
              }
            }
          }, _callee18);
        }));
        return function (_x35, _x36, _x37) {
          return _ref18.apply(this, arguments);
        };
      }());
    } catch (e) {
      reject(e);
    }
  });
};
var sendMessageBooking = function sendMessageBooking(sender_psid) {
  return new Promise( /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(resolve, reject) {
      var response;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              response = {
                "attachment": {
                  "type": "template",
                  "payload": {
                    "template_type": "button",
                    "text": "B\u1EA1n \u0111\xE3 l\u1EF1a ch\u1ECDn \u0111\u1EB7t kh\xE1m online, vui l\xF2ng nh\u1EA5n v\xE0o \"C\xE0i \u0111\u1EB7t th\xF4ng tin\" \u0111\u1EC3 ho\xE0n t\u1EA5t c\xE1c th\xF4ng tin c\u1EA7n thi\u1EBFt.",
                    "buttons": [{
                      "type": "web_url",
                      "url": WEBVIEW_URL,
                      "title": "Cài đặt thông tin",
                      "webview_height_ratio": "tall",
                      //display on mobile
                      "messenger_extensions": true //false : open the webview in new tab
                    }, {
                      "type": "postback",
                      "title": "Quay trở lại",
                      "payload": "BACK"
                    }]
                  }
                }
              };
              _context19.next = 3;
              return sendMessage(sender_psid, response);
            case 3:
              resolve("done");
            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));
    return function (_x38, _x39) {
      return _ref19.apply(this, arguments);
    };
  }());
};
var handleResBookingOnlineMessenger = function handleResBookingOnlineMessenger(user) {
  return new Promise( /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(resolve, reject) {
      var username, phoneNumber, response;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              //save to database
              //name, phone, reason
              username = user.customerName;
              phoneNumber = user.phone;
              if (!(username === "")) {
                _context20.next = 7;
                break;
              }
              _context20.next = 6;
              return getFacebookUsername(user.psid);
            case 6:
              username = _context20.sent;
            case 7:
              response = {
                "text": "*Th\xF4ng tin kh\xE1m b\u1EC7nh:*\n                    \n*H\u1ECD v\xE0 t\xEAn*: _".concat(username, "_\n                    \n*S\u1ED1 \u0111i\u1EC7n tho\u1EA1i*: _").concat(phoneNumber, "_\n                    \n*L\xED do kh\xE1m*: _").concat(user.reason, "_\n                    \n\nTh\xF4ng tin c\u1EE7a b\u1EA1n \u0111\xE3 \u0111\u01B0\u1EE3c ghi nh\u1EADn. Nh\xE2n vi\xEAn ch\u0103m s\xF3c kh\xE1ch h\xE0ng s\u1EBD li\xEAn l\u1EA1c v\u1EDBi b\u1EA1n trong th\u1EDDi gian s\u1EDBm nh\u1EA5t.")
              };
              _context20.next = 10;
              return sendMessage(user.psid, response);
            case 10:
              _context20.next = 12;
              return sendMessageDefault(user.psid, "Xem thêm thông tin:");
            case 12:
              resolve("done");
              _context20.next = 18;
              break;
            case 15:
              _context20.prev = 15;
              _context20.t0 = _context20["catch"](0);
              reject(_context20.t0);
            case 18:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 15]]);
    }));
    return function (_x40, _x41) {
      return _ref20.apply(this, arguments);
    };
  }());
};
var chatFBServie = {
  handlePostback: handlePostback,
  handleMessage: handleMessage,
  getWitEntities: getWitEntities,
  getWitEntitiesWithExpression: getWitEntitiesWithExpression,
  handleSetupBotFBPage: handleSetupBotFBPage,
  getFacebookUsername: getFacebookUsername,
  sendMessageAllDoctors: sendMessageAllDoctors,
  sendMessageAllClinics: sendMessageAllClinics,
  sendMessageAllSpecializations: sendMessageAllSpecializations,
  sendMessageDefault: sendMessageDefault,
  takeControlConversation: takeControlConversation,
  handleResBookingOnlineMessenger: handleResBookingOnlineMessenger
};
module.exports = chatFBServie;