import express from "express";
import {
    addOffer, adminExpiredOffersView, adminOffersView, adminOfferView, editOffer, removeOffer
} from "../../controllers/admin/adminOffersController.js";
import adminCourses from "./adminCourses.js";
import loggedIn from "../../src/middlewares/loggedIn.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import loadUser from "../../src/middlewares/loadUser.js";
import approved from "../../src/middlewares/approved.js";

const adminOffers = express.Router()

adminOffers.get("/admin/offers", loadUser, loggedIn, approved, loadToastMessages, adminOffersView)
adminOffers.get("/admin/expired-offers", loadUser, loggedIn, approved, loadToastMessages, adminExpiredOffersView)
adminOffers.get("/admin/offers/:id", loadUser, loggedIn, approved, loadToastMessages, adminOfferView)
adminOffers.post("/admin/offers/add-offer", loadUser, loggedIn, approved, addOffer)
adminOffers.post("/admin/offers/edit-offer/:id", loadUser, loggedIn, approved, editOffer)
adminCourses.get("/admin/offers/remove-offer/:id", loadUser, loggedIn, approved, loadToastMessages, removeOffer)

export default adminOffers