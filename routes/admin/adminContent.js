import express from "express";
import loggedIn from "../../src/middlewares/loggedIn.js";
import {
    adminContentView,
    changeHomeTexts,
    changeLogo,
    changeSocialLinks
} from "../../controllers/admin/adminContentController.js";
import {upload} from "../../src/middlewares/upload.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import loadUser from "../../src/middlewares/loadUser.js";
import approved from "../../src/middlewares/approved.js";

const content = express.Router()

content.get("/admin/content", loadUser, loggedIn, approved, loadToastMessages, adminContentView)
content.post("/admin/content/change-logo", loadUser, loggedIn, approved, upload.single('logo'), changeLogo)
content.post("/admin/content/change-home-texts", loadUser, loggedIn, approved, changeHomeTexts)
content.post("/admin/content/change-social-links", loadUser, loggedIn, approved, changeSocialLinks)


export default content