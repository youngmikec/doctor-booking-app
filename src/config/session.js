// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
import expres from 'express';
import Sequelize from 'sequelize';
import session from 'express-session';



// initalize sequelize with session store
let SequelizeStore = require('connect-session-sequelize')(session.Store);

let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        storage: "./session.mysql",
        logging: false,

        dialectOptions: {
            "dateStrings": true,
            "typeCast": true,
            "timezone": "+07:00"
        },
        timezone: "+07:00"
    }
    );

let sessionStore = new SequelizeStore({
    db: sequelize
});

let configSession = (app) => {
    app.use(session({
        key: "express.sid",
        secret: "secret",
        store: sessionStore,
        resave: true,
        saveUninitialized: false,
        cookie : { httpOnly: false, secure : false, maxAge : (24 * 60 * 60 * 1000)} // 1day
    }))
};

sessionStore.sync();

const sessions = {
    configSession: configSession
};

export default sessions;