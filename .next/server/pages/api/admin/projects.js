"use strict";
(() => {
var exports = {};
exports.id = 2193;
exports.ids = [2193];
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

/***/ 6095:
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
;// CONCATENATED MODULE: ./model/projects.js

const projectsSchema = new (external_mongoose_default()).Schema({
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
const Projects = (external_mongoose_default()).models.Projects || external_mongoose_default().model("Projects", projectsSchema);
/* harmony default export */ const projects = (Projects);

;// CONCATENATED MODULE: ./pages/api/admin/projects/index.js


async function handler(req, res) {
    await (0,conn/* default */.Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const { method  } = req;
    const updateCategory = req.body.updateCategory;
    const image = req.body.url;
    //   get method
    if (method == "GET") {
        try {
            // Find a user by ID in the database
            const category = await projects.find();
            // Return the user as a JSON response
            res.status(200).json(category);
        } catch (error) {
            // Return a 500 error if there's a server error
            res.status(500).json({
                message: "Server error"
            });
        }
    } else if (method == "POST") {
        try {
            // Find a user by ID in the database
            const categoryData = await projects.findOne({
                category: updateCategory
            });
            if (categoryData) {
                res.status(200).json({
                    message: "Already Exist"
                });
            }
            const category = new projects({
                category: updateCategory,
                image: image
            });
            const savedCategory = await category.save();
            res.status(200).json({
                message: "Category added to Database"
            });
        } catch (error) {
            // Return a 500 error if there's a server error
            res.status(500).json({
                message: "Server error"
            });
        }
    } else if (req.method == "DELETE") {
        try {
            const { id  } = req.query;
            const deletedCategory = await projects.findByIdAndDelete(id);
            if (!deletedCategory) {
                res.status(404).json({
                    message: "Category not found"
                });
            } else {
                res.status(200).json({
                    message: "Category deleted successfully"
                });
            }
        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
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
var __webpack_exports__ = (__webpack_exec__(6095));
module.exports = __webpack_exports__;

})();