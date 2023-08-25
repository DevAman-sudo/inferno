"use strict";
(() => {
var exports = {};
exports.id = 513;
exports.ids = [513];
exports.modules = {

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 3299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2663);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const connectMongo = async ()=>{
    try {
        const { connection  } = await mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(process.env.MONGODB_URI);
    // if(connection.readyState == 1){
    //     console.log("Database Connected")
    // }
    } catch (errors) {
        return Promise.reject(errors);
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectMongo);


/***/ }),

/***/ 1301:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler)
});

// EXTERNAL MODULE: ./database/conn.js
var conn = __webpack_require__(3299);
// EXTERNAL MODULE: external "mongoose"
var external_mongoose_ = __webpack_require__(2663);
var external_mongoose_default = /*#__PURE__*/__webpack_require__.n(external_mongoose_);
;// CONCATENATED MODULE: ./model/shipping.js

const shippingSchema = new (external_mongoose_default()).Schema({
    shipping: {
        type: Number,
        required: true
    }
});
// Check if the model already exists before compiling it
const Shipping = (external_mongoose_default()).models.Shipping || external_mongoose_default().model("Shipping", shippingSchema);
/* harmony default export */ const shipping = (Shipping);

;// CONCATENATED MODULE: ./pages/api/admin/shipping.js


async function handler(req, res) {
    try {
        await (0,conn/* default */.Z)();
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            error: "Database error"
        });
        return;
    }
    const { method  } = req;
    if (method === "GET") {
        try {
            const existingAlerts = await shipping.find();
            res.status(200).json({
                data: existingAlerts
            });
        } catch (error) {
            console.error("Error fetching alerts:", error);
            res.status(500).json({
                error: "Server error"
            });
        }
    } else if (method == "POST") {
        try {
            const cost = req.query.cost;
            await shipping.deleteMany(); // Delete all existing alerts
            const newShipping = new shipping({
                shipping: cost
            });
            await newShipping.save();
            res.status(200).json({
                message: "Shipping cost updated successfully"
            });
        } catch (error) {
            console.error("Error creating alert:", error);
            res.status(500).json({
                error: "Server error"
            });
        }
    } else {
        res.status(405).json({
            error: "Method not allowed"
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
var __webpack_exports__ = (__webpack_exec__(1301));
module.exports = __webpack_exports__;

})();