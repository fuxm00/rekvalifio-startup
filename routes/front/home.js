import express from "express";
import {homeView} from "../../controllers/front/homeController.js";
import loadFrontHeaderLinks from "../../src/middlewares/loadFrontHeaderLinks.js";
import loadOffers from "../../src/middlewares/loadOffers.js";

const home = express.Router()

home.get("/", loadFrontHeaderLinks, loadOffers, homeView);

export default home