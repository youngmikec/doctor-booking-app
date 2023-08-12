//"use strict";

var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// require('dotenv').config();
require('dotenv').config();
var transporter = _nodemailer["default"].createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  // use SSL-TLS
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
var sendEmailNormal = function sendEmailNormal(to, subject, htmlContent) {
  var options = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    html: htmlContent
  };
  return transporter.sendMail(options);
};
var sendEmailWithAttachment = function sendEmailWithAttachment(to, subject, htmlContent, filename, path) {
  var options = {
    from: process.env.MAIL_USERNAME,
    to: to,
    subject: subject,
    html: htmlContent,
    attachments: [{
      filename: filename,
      path: path
    }]
  };
  return transporter.sendMail(options);
};
// module.exports = {
//     sendEmailNormal: sendEmailNormal,
//     sendEmailWithAttachment: sendEmailWithAttachment
// };

var mailer = {
  sendEmailNormal: sendEmailNormal,
  sendEmailWithAttachment: sendEmailWithAttachment
};
module.exports = mailer;