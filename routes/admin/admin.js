import express from "express";
import {adminView} from "../../controllers/admin/adminController.js";
import loggedIn from "../../src/middlewares/loggedIn.js";
import loadUser from "../../src/middlewares/loadUser.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import approved from "../../src/middlewares/approved.js";

const admin = express.Router()

admin.get("/admin", loadUser, loggedIn, approved, loadToastMessages, adminView)

export default admin