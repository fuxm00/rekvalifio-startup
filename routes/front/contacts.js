import {contactsView} from "../../controllers/front/contactsController.js";
import express from "express";
import loadFrontHeaderLinks from "../../src/middlewares/loadFrontHeaderLinks.js";
import loadOffers from "../../src/middlewares/loadOffers.js";

const contacts = express.Router()

contacts.get("/contacts", loadFrontHeaderLinks, loadOffers, contactsView)

export default contacts