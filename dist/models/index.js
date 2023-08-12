'use strict';

// require('dotenv').config();
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _fs = _interopRequireWildcard(require("fs"));
var _sequelize = _interopRequireDefault(require("sequelize"));
var _url = require("url");
var _path = require("path");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
require('dotenv').config();
var path = require('path');
;
// import configJson from '../config/config.json';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const __filename = path.resolve(process.cwd(), __filename);
var _dirname = path.dirname(__filename);

// const configPath = path.resolve(__dirname, '../config/config.json');
// const configRaw = readFileSync(configPath, 'utf8');
// const config = JSON.parse(configRaw);

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
// const config = config[env];
var db = {};
console.log('got here');
// const configForEnv = config[env];
// console.log('config', configForEnv);

var sequelize;
// if (configForEnv) {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         operatorsAliases: 0,
//         dialectOptions: {
//             dateStrings: true,
//             typeCast: true,
//             timezone: "+07:00"
//         },
//         timezone: "+07:00",
//         logging: false,
//     });

// } else {
//     sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//         host: process.env.DB_HOST,
//         dialect: 'mysql',
//         operatorsAliases: 0,
//         dialectOptions: {
//             dateStrings: true,
//             typeCast: true,
//             timezone: "+07:00",
//         },
//         timezone: "+07:00",
//         logging: false,
//     });

//     sequelize.authenticate().then(() => {
//         console.log('Connection to your databse has been established successfully.');
//     }).catch(err => {
//         console.error('Unable to connect to the database:', err);
//     });
// }

sequelize = new _sequelize["default"](process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: 0,
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+07:00"
  },
  timezone: "+07:00",
  logging: false
});
sequelize.authenticate().then(function () {
  console.log('Connection to your databse has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
_fs["default"].readdirSync(_dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  var model = sequelize['import'](path.join(_dirname, file));
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = _sequelize["default"];

// module.exports = db;
module.exports = db;