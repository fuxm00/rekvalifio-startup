import express from "express";
import {conditionsView} from "../../controllers/front/conditionsController.js";
import loadFrontHeaderLinks from "../../src/middlewares/loadFrontHeaderLinks.js";
import loadOffers from "../../src/middlewares/loadOffers.js";

const conditions = express.Router()

conditions.get("/conditions", loadFrontHeaderLinks, loadOffers, conditionsView)

export default conditions