"use strict";
(() => {
var exports = {};
exports.id = 1877;
exports.ids = [1877];
exports.modules = {

/***/ 8432:
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 2581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: ./database/conn.js
var conn = __webpack_require__(3299);
// EXTERNAL MODULE: ./model/user.js
var model_user = __webpack_require__(4900);
// EXTERNAL MODULE: external "jsonwebtoken"
var external_jsonwebtoken_ = __webpack_require__(9344);
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_);
// EXTERNAL MODULE: external "bcryptjs"
var external_bcryptjs_ = __webpack_require__(8432);
var external_bcryptjs_default = /*#__PURE__*/__webpack_require__.n(external_bcryptjs_);
;// CONCATENATED MODULE: external "cookie"
const external_cookie_namespaceObject = require("cookie");
;// CONCATENATED MODULE: ./pages/api/users/login.js





async function handler(req, res) {
    await (0,conn/* default */.Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    // post request
    if (method === "POST") {
        const { email , password  } = req.body;
        // verifying admin
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = external_jsonwebtoken_default().sign({
                isAdmin: true
            }, process.env.JWT_SECRET, {
                expiresIn: "30d"
            });
            res.status(200).json({
                message: "isAdminTrue",
                token
            });
        } else {
            try {
                // Check if user exists in the database
                const user = await model_user/* default.findOne */.Z.findOne({
                    email
                });
                const isMatch = external_bcryptjs_default().compare(password, user.password);
                console.log(isMatch);
                console.log(password);
                if (!user) {
                    return res.status(404).json({
                        message: "User not found."
                    });
                }
                if (!isMatch) {
                    return res.status(401).json({
                        message: "Invalid credentials."
                    });
                }
                // Create a JWT token with the user's ID
                const token = external_jsonwebtoken_default().sign({
                    userId: user._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "30d"
                });
                // Return the user data along with the token
                res.status(200).json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                });
            } catch (error) {
                console.error("Error logging in:", error.message);
                res.status(500).json({
                    message: "Internal server error."
                });
            }
        }
    } else {
        res.status(405).json({
            message: "Method not allowed"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [6897], () => (__webpack_exec__(2581)));
module.exports = __webpack_exports__;

})();