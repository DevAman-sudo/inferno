"use strict";
(() => {
var exports = {};
exports.id = 9441;
exports.ids = [9441];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 871:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 240:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _model_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4900);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(871);
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_4__);





async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    if (method === "POST") {
        const { userName , userEmail , userKey  } = req.body;
        // Decode the string
        const userPassword = buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer.from(userKey, "base64").toString();
        const userSignedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_4___default().hash(userPassword, 10);
        try {
            const existingUser = await _model_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
                email: userEmail
            });
            if (existingUser) {
                res.status(200).json({
                    message: "user already exist"
                });
            } else {
                const newUser = new _model_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
                    name: userName,
                    email: userEmail,
                    password: userSignedPassword
                });
                const savedUser = await newUser.save();
                res.status(201).json({
                    message: "registration successful"
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Internal Server Error"
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
var __webpack_exports__ = __webpack_require__.X(0, [6897], () => (__webpack_exec__(240)));
module.exports = __webpack_exports__;

})();