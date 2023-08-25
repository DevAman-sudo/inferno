"use strict";
(() => {
var exports = {};
exports.id = 8626;
exports.ids = [8626];
exports.modules = {

/***/ 2663:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 5184:
/***/ ((module) => {

module.exports = require("nodemailer");

/***/ }),

/***/ 8212:
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
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5184);
/* harmony import */ var nodemailer__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(nodemailer__WEBPACK_IMPORTED_MODULE_5__);






async function handler(req, res) {
    await (0,_database_conn__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)().catch(()=>{
        res.status(405).json({
            error: "database error"
        });
    });
    const transporter = nodemailer__WEBPACK_IMPORTED_MODULE_5___default().createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { method  } = req;
    //   get method
    if (method == "GET") {
        try {
            const order = await _model_order__WEBPACK_IMPORTED_MODULE_1__/* ["default"].find */ .Z.find({
                user: req.query.id
            }).populate("user", "name").populate({
                path: "orderItems",
                populate: {
                    path: "product",
                    populate: "category"
                }
            });
            res.status(200).send(order);
        } catch (error) {
            console.log(`Error from Order.js => ${error}`);
            res.status(500).json("Internal Server Error");
        }
    } else if (method == "POST") {
        try {
            const orderItemsIds = await Promise.all(req.body.cartItems.map(async (orderItem)=>{
                let newOrderItem = new _model_orderItem__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z({
                    quantity: orderItem.num,
                    product: orderItem._id
                });
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            }));
            const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemId)=>{
                const orderItem = await _model_orderItem__WEBPACK_IMPORTED_MODULE_2__/* ["default"].findById */ .Z.findById(orderItemId).populate("product", "price");
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            }));
            const totalPrice = totalPrices.reduce((a, b)=>a + b, 0);
            let order = new _model_order__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z({
                orderItems: orderItemsIds,
                address: req.body.address,
                apartment: req.body.apartment,
                phone: req.body.phoneNumber,
                status: req.body.status,
                totalPrice: req.body.totalPrice,
                user: req.body.userId
            });
            order = await order.save();
            // Send an email to the subscriber
            const message = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER,
                subject: "New Order Received",
                html: `
          <h1>New Order Received</h1>
          <p>Dear Admin,</p>
          <p>A new order has been placed with the following details:</p>
          <h2>Order Details</h2>
          <ul>
            <li>Order ID: ${order._id}</li>
            <li>Address: ${req.body.address}</li>
            <li>Apartment: ${req.body.apartment}</li>
            <li>Phone: ${req.body.phoneNumber}</li>
            <li>Total Price: Rs${totalPrice.toFixed(2)}</li>
          </ul>
          <p>Thank you!</p>
        `
            };
            await transporter.sendMail(message);
            res.status(200).json(order);
        } catch (error) {
            console.log(`Error from Order.js => ${error}`);
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
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4815,6610], () => (__webpack_exec__(8212)));
module.exports = __webpack_exports__;

})();