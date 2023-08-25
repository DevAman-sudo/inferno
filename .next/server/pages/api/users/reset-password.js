"use strict";
(() => {
var exports = {};
exports.id = 8099;
exports.ids = [8099];
exports.modules = {

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 1928:
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
;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/users/reset-password.js


async function handler(req, res) {
    // Send an email with the password reset link to the user's email address
    const transporter = external_nodemailer_default().createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { method  } = req;
    const email = req.body;
    if (method === "POST") {
        // Generate a unique token
        const token = external_crypto_default().randomBytes(20).toString("hex");
        const resetLink = `${req.headers.origin}:${process.env.PORT}/login/verify?token=${token}`;
        const message = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset",
            html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f3f3f3;
                margin: 0;
                padding: 0;
              }
              
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              
              .logo img {
                max-width: 200px;
              }
              
              .message {
                color: #333333;
              }
              
              .button {
                display: inline-block;
                background-color: #4caf50;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <p class="message">Please click the button below to reset your password.</p>
              <div class="button-container" style="text-align: center;">
                <a class="button" href="${resetLink}">Reset Password</a>
              </div>
            </div>
          </body>
        </html>
      `
        };
        try {
            await transporter.sendMail(message);
            res.status(200).json({
                token,
                message: "Email sent"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Failed to send email"
            });
        }
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1928));
module.exports = __webpack_exports__;

})();