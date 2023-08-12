// import db from "../models/index";
// import moment from "moment";

const db = require('../models/index');
const moment = require('moment');


let getSpecializationById = (id) => {
    return new Promise(async (resolve, reject) => {
            try {
                let specialization = await db.Specialization.findOne({ where: { id: id } });
                resolve(specialization);
            } catch (e) {
                reject(e);
            }
        }
    );
};

let getClinicById = (id) => {
    return new Promise(async (resolve, reject) => {
            try {
                let clinic = await db.Clinic.findOne({ where: { id: id } });
                resolve(clinic);
            } catch (e) {
                reject(e);
            }
        }
    );
};

let getSupporterById = (id) => {
    return new Promise((async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                attributes: [ 'id', 'name', 'avatar' ]
            });
            resolve(user);
        } catch (e) {
            reject(e);
        }
    }));
};

let convertDateClient = (date) => {
    return moment(date).format('DD-MM-YYYY');
};

const helper = {
    getSpecializationById: getSpecializationById,
    getClinicById: getClinicById,
    getSupporterById: getSupporterById,
    convertDateClient: convertDateClient
};

module.exports = helper;