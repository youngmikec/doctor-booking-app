'use strict';
// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
import fs from 'fs';
const path = require('path');

import Sequelize from "sequelize";;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';
// import configJson from '../config/config.json';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const __filename = path.resolve(process.cwd(), __filename);
const __dirname = path.dirname(__filename);

// const configPath = path.resolve(__dirname, '../config/config.json');
// const configRaw = readFileSync(configPath, 'utf8');
// const config = JSON.parse(configRaw);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = config[env];
const db = {};
console.log('got here')
// const configForEnv = config[env];
// console.log('config', configForEnv);

let sequelize;
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


sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    operatorsAliases: 0,
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        timezone: "+07:00",
    },
    timezone: "+07:00",
    logging: false,
});

sequelize.authenticate().then(() => {
    console.log('Connection to your databse has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// module.exports = db;
module.exports = db;
