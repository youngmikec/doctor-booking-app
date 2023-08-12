const {tranRegisterEmail, tranForgotPassword} = require("../../lang/en");
const mailer = require("./../config/mailer");
const userService = require("./../services/userService");
// require('dotenv').config();
require('dotenv').config();


let register = ({user}, linkVerify) => {
    return new Promise(async (resolve, reject) => {
        let isEmailSend = await mailer.sendEmailNormal(user.local.email, tranRegisterEmail.subject, tranRegisterEmail.template(linkVerify));
        if (isEmailSend) resolve(tranRegisterEmail.sendSuccess(user.local.email));
        else reject(tranRegisterEmail.sendFail);
    });
};
let verifyAccount = (token) => {
    return new Promise(async (resolve, reject) => {
        await userService.verifyAccount(token)
            .then(() => {
                resolve(tranRegisterEmail.account_active);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
let resetPassword = (email, linkVerify) => {
    return new Promise(async (resolve, reject) => {
        let isEmailSend = await mailer.sendEmailNormal(email, tranForgotPassword.subject, tranForgotPassword.template(linkVerify));
        if (isEmailSend) resolve(true);
        else reject(false);
    });
};



let setNewPassword = (email, password) => {
    return new Promise(async (resolve, reject) => {
        await userService.findUserByEmail(email)
            .then(async (user) => {
                if (!user) reject("user not found");
                else {
                    await userService.setNewPassword(user._id, password);
                    resolve(true);
                }
            }).catch((err) => {
                reject(err);
            });
    });
};

const authService = {
    register: register,
    verifyAccount: verifyAccount,
    resetPassword: resetPassword,
    setNewPassword: setNewPassword
};

module.exports = authService;