import express from "express";
import {gdprView} from "../../controllers/front/gdprController.js";
import loadFrontHeaderLinks from "../../src/middlewares/loadFrontHeaderLinks.js";
import loadOffers from "../../src/middlewares/loadOffers.js";

const gdpr = express.Router()

gdpr.get("/gdpr", loadFrontHeaderLinks, loadOffers, gdprView)

export default gdpr