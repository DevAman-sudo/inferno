"use strict";
(() => {
var exports = {};
exports.id = 2712;
exports.ids = [2712];
exports.modules = {

/***/ 9344:
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ 6518:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9344);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

async function handler(req, res) {
    const { method  } = req;
    if (method == "POST") {
        const token = req.query.token;
        const decodedToken = await jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(`${token}`, process.env.JWT_SECRET);
        if (decodedToken) {
            res.status(200).json({
                message: "allGood"
            });
        } else {
            res.status(401).json({
                message: "token not valid"
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
var __webpack_exports__ = (__webpack_exec__(6518));
module.exports = __webpack_exports__;

})();