"use strict";
(() => {
var exports = {};
exports.id = 7215;
exports.ids = [7215];
exports.modules = {

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 605:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _model_order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4858);
/* harmony import */ var _model_orderItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8211);
/* harmony import */ var _model_product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var _model_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4900);





async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    //   get method
    if (method == "GET") {
        try {
            const orderList = await _model_order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find().populate({
                path: "user",
                model: _model_user__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z,
                select: "-password" // Exclude the password field from the user details
            }).populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    populate: "category"
                }
            }).sort({
                dateOrdered: -1
            });
            res.status(200).json(orderList);
        } catch (error) {
            console.log(`Error from admin Order.js => ${error}`);
            res.status(500).json("Internal Server Error");
        }
    } else if (method == "PUT") {
        try {
            const order = await _model_order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndUpdate */ .Z.findByIdAndUpdate(req.query.id, {
                status: req.body.status
            }, {
                new: true
            });
            res.status(200).json(order);
        } catch (error) {
            console.log(`Error from admin Order.js => ${error}`);
            res.status(500).json("Internal Server Error");
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
var __webpack_exports__ = __webpack_require__.X(0, [4815,6610], () => (__webpack_exec__(605)));
module.exports = __webpack_exports__;

})();