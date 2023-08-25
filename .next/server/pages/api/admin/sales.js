"use strict";
(() => {
var exports = {};
exports.id = 6852;
exports.ids = [6852];
exports.modules = {

/***/ 2245:
/***/ ((module) => {

module.exports = require("moment");

/***/ }),

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3519:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _model_order__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4858);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2245);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);



async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    if (method === "GET") {
        try {
            // Calculate the start and end dates of the current week
            const startOfWeek = moment__WEBPACK_IMPORTED_MODULE_2___default()().startOf("week").toDate();
            const endOfWeek = moment__WEBPACK_IMPORTED_MODULE_2___default()().endOf("week").toDate();
            const totalSales = await _model_order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].aggregate */ .Z.aggregate([
                {
                    $match: {
                        dateOrdered: {
                            $gte: startOfWeek,
                            $lte: endOfWeek
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: {
                            $sum: "$totalPrice"
                        }
                    }
                }
            ]);
            const sales = totalSales.length > 0 ? totalSales[0].totalAmount : 0;
            res.status(200).json({
                totalSales: sales
            });
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
var __webpack_exports__ = __webpack_require__.X(0, [4815], () => (__webpack_exec__(3519)));
module.exports = __webpack_exports__;

})();