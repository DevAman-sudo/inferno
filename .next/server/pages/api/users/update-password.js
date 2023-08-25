"use strict";
(() => {
var exports = {};
exports.id = 5205;
exports.ids = [5205];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _model_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4900);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8432);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);



async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    const { email , password  } = req.body;
    if (method === "POST") {
        try {
            // Find the user by email
            const user = await _model_user__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findOne */ .Z.findOne({
                email
            });
            // If user not found, return an error response
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }
            // Hash the new password
            const hashedPassword = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().hash(password, 10);
            // Update the user's password in the database
            user.password = hashedPassword;
            await user.save();
            // Return a success response
            res.status(200).json({
                message: "Password updated"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Something went wrong"
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
var __webpack_exports__ = __webpack_require__.X(0, [6897], () => (__webpack_exec__(3151)));
module.exports = __webpack_exports__;

})();