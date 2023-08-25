"use strict";
(() => {
var exports = {};
exports.id = 4927;
exports.ids = [4927];
exports.modules = {

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 7881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5184);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    // Send an email with the password reset link to the user's email address
    const transporter = nodemailer__WEBPACK_IMPORTED_MODULE_0___default().createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { method  } = req;
    if (method === "POST") {
        const html = `
      <html>
        <head>
          <style>
            /* Styles for the email */
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
            }
            
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            
            .header {
              background-color: #f1f1f1;
              padding: 10px;
            }
            
            h1 {
              color: #333333;
            }
            
            .message-details {
              margin-top: 20px;
            }
            
            p {
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Contact Form Submission</h1>
            </div>
            <div class="message-details">
              <p><strong>Name:</strong> ${req.body.name}</p>
              <p><strong>Email:</strong> ${req.body.email}</p>
              <p><strong>Message:</strong> ${req.body.message}</p>
            </div>
          </div>
        </body>
      </html>
    `;
        const message = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "Contact Form Submission",
            html: html
        };
        try {
            await transporter.sendMail(message);
            res.status(200).json({
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
var __webpack_exports__ = (__webpack_exec__(7881));
module.exports = __webpack_exports__;

})();