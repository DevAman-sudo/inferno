"use strict";
(() => {
var exports = {};
exports.id = 9291;
exports.ids = [9291];
exports.modules = {

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 1673:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: external "nodemailer"
var external_nodemailer_ = __webpack_require__(5184);
var external_nodemailer_default = /*#__PURE__*/__webpack_require__.n(external_nodemailer_);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(2663);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./model/subscriber.js

const subscriberSchema = new (external_mongoose_default()).Schema({
    subscriber: {
        type: String,
        trim: true
    }
});
// Check if the model already exists before compiling it
const Subscriber = (external_mongoose_default()).models.Subscriber || external_mongoose_default().model("Subscriber", subscriberSchema);
/* harmony default export */ const subscriber = (Subscriber);

;// CONCATENATED MODULE: ./pages/api/mails/subscribe.js


async function handler(req, res) {
    const transporter = external_nodemailer_default().createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { method , body  } = req;
    if (method === "POST") {
        // Save the subscriber's email to the database
        try {
            await subscriber.create({
                subscriber: body.email
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Failed to save subscriber"
            });
        }
        // Send an email to the subscriber
        const message = {
            from: process.env.EMAIL_USER,
            to: body.email,
            subject: "You are now subscribed",
            html: `
        <h1>Welcome to Our Newsletter</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You will receive regular updates and news from us.</p>
        <p>If you have any questions, feel free to contact us.</p>
      `
        };
        try {
            await transporter.sendMail(message);
            return res.status(200).json({
                message: "Email sent"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Failed to send email"
            });
        }
    }
    return res.status(405).json({
        message: "Method Not Allowed"
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1673));
module.exports = __webpack_exports__;

})();