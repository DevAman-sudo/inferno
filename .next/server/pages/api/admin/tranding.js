"use strict";
(() => {
var exports = {};
exports.id = 3560;
exports.ids = [3560];
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

/***/ 9817:
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
;// CONCATENATED MODULE: ./model/tranding.js
// models/Product.js

const trandingSchema = new (external_mongoose_default()).Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    image: {
        type: String,
        required: true
    }
});
const Tranding = (external_mongoose_default()).models.Tranding || external_mongoose_default().model("Tranding", trandingSchema);
/* harmony default export */ const tranding = (Tranding);

;// CONCATENATED MODULE: ./pages/api/admin/tranding.js


async function handler(req, res) {
    await (0,conn/* default */.Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    // GET REQUEST
    if (req.method == "GET") {
        try {
            // Find a user by ID in the database
            const product = await tranding.find();
            if (!product) {
                // Return a 404 error if user is not found
                res.status(404).json({
                    message: "Products not found"
                });
            } else {
                // Return the user as a JSON response
                res.status(200).json(product);
            }
        } catch (error) {
            // Return a 500 error if there's a server error
            res.status(500).json({
                message: "Server error"
            });
        }
    } else if (req.method == "POST") {
        try {
            const { productName  } = req.body;
            const { productDescription  } = req.body;
            const { productPrice  } = req.body;
            const { productCategory  } = req.body;
            const { url  } = req.body;
            const product = new tranding({
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory,
                image: url
            });
            const savedProduct = await product.save();
            res.status(200).json({
                message: "Product created successfully",
                data: savedProduct
            });
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    } else if (req.method == "DELETE") {
        try {
            const { id  } = req.query;
            const deletedProduct = await tranding.findByIdAndDelete(id);
            if (!deletedProduct) {
                res.status(404).json({
                    message: "Product not found"
                });
            } else {
                res.status(200).json({
                    message: "Product deleted successfully"
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    } else {
        res.status(400).json({
            message: "Invalid request method"
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
var __webpack_exports__ = (__webpack_exec__(9817));
module.exports = __webpack_exports__;

})();