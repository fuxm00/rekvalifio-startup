import express from "express";
import {
    coursesView,
    courseOrderView,
    courseView,
    orderCompleteView,
    placeOrder, categoryView, proceedOrder, orderSummaryView
} from "../../controllers/front/coursesController.js";
import loadFrontHeaderLinks from "../../src/middlewares/loadFrontHeaderLinks.js";
import loadOffers from "../../src/middlewares/loadOffers.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";

const courses = express.Router()

courses.get("/courses", loadFrontHeaderLinks, loadOffers, coursesView)
courses.get("/course-category/:id", loadFrontHeaderLinks, loadOffers, categoryView)
courses.get("/course/order-summary", loadFrontHeaderLinks, loadOffers, orderSummaryView)
courses.get('/course/:id', loadFrontHeaderLinks, loadOffers, courseView)
courses.get('/course/order/:id', loadFrontHeaderLinks, loadOffers, loadToastMessages, courseOrderView)
courses.get('/course/order-complete/:id', loadFrontHeaderLinks, loadOffers, orderCompleteView)

courses.post("/course/order-proceed/:id", proceedOrder)
courses.post('/course/place-order/:id', placeOrder)




export default courses