//"use strict";

var _chatFBService = _interopRequireDefault(require("./../services/chatFBService.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// import request from "request";
// require('dotenv').config();
require('dotenv').config();
var getWebhookFB = function getWebhookFB(req, res) {
  var VERIFY_TOKEN = process.env.PAGE_ACCESS_TOKEN;
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};
var postWebhookFB = function postWebhookFB(req, res) {
  var body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      if (entry.standby) {
        //if user's message is "back" or "exit", return the conversation to the bot
        var webhook_standby = entry.standby[0];
        if (webhook_standby && webhook_standby.message) {
          if (webhook_standby.message.text === "back" || webhook_standby.message.text === "exit") {
            // call function to return the conversation to the primary app
            // chatbotService.passThreadControl(webhook_standby.sender.id, "primary");
            _chatFBService["default"].takeControlConversation(webhook_standby.sender.id);
          }
        }
        return;
      }
      var webhook_event = entry.messaging[0];
      var sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
        _chatFBService["default"].handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        _chatFBService["default"].handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};
var getSetupBotFBPage = function getSetupBotFBPage(req, res) {
  return res.render("setupBotFB.ejs");
};
var handleSetupBotFBPage = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _chatFBService["default"].handleSetupBotFBPage();
          case 3:
            return _context.abrupt("return", res.status(200).json({
              message: "ok"
            }));
          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(500).json(_context.t0));
          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function handleSetupBotFBPage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getBookingOnlineMessengerPage = function getBookingOnlineMessengerPage(req, res) {
  return res.render("bookingOnlineMessenger.ejs");
};
var setInfoBookingMessenger = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var info;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            info = {
              "psid": req.body.psid,
              "customerName": req.body.customerName,
              "phone": req.body.phone,
              "reason": req.body.reason
            };
            _context2.next = 4;
            return _chatFBService["default"].handleResBookingOnlineMessenger(info);
          case 4:
            return _context2.abrupt("return", res.status(200).json({
              "message": "done"
            }));
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", res.status(500).json(_context2.t0));
          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function setInfoBookingMessenger(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var bot = {
  getWebhookFB: getWebhookFB,
  postWebhookFB: postWebhookFB,
  getSetupBotFBPage: getSetupBotFBPage,
  handleSetupBotFBPage: handleSetupBotFBPage,
  getBookingOnlineMessengerPage: getBookingOnlineMessengerPage,
  setInfoBookingMessenger: setInfoBookingMessenger
};
module.exports = bot;