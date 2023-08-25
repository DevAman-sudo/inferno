"use strict";
(() => {
var exports = {};
exports.id = 5151;
exports.ids = [5151];
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

/***/ 5725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2663);
/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);

const productSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({
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
    images: {
        type: [
            String
        ],
        required: true
    },
    discount: {
        type: Number,
        default: 0
    }
});
const Product = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models.Product) || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model("Product", productSchema);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Product);


/***/ }),

/***/ 145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _database_conn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3299);
/* harmony import */ var _model_product__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);


async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    // GET REQUEST
    if (req.method === "GET") {
        try {
            // Find all products in the database
            const products = await _model_product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find();
            if (products.length === 0) {
                // Return a 404 error if no products are found
                res.status(404).json({
                    message: "Products not found"
                });
            } else {
                // Return the products as a JSON response
                res.status(200).json(products);
            }
        } catch (error) {
            // Return a 500 error if there's a server error
            res.status(500).json({
                message: "Server error"
            });
        }
    } else if (req.method === "POST") {
        try {
            const { productName , productDescription , productPrice , productCategory , imageUrls  } = req.body;
            const product = new _model_product__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
                name: productName,
                description: productDescription,
                price: productPrice,
                category: productCategory,
                images: imageUrls
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
    } else if (req.method === "DELETE") {
        try {
            const { id  } = req.query;
            const deletedProduct = await _model_product__WEBPACK_IMPORTED_MODULE_1__/* ["default"].findByIdAndDelete */ .Z.findByIdAndDelete(id);
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
var __webpack_exports__ = (__webpack_exec__(145));
module.exports = __webpack_exports__;

})();