import express from "express";
import {
    adminUserLogin,
    adminUserLoginView,
    adminUserLogOut,
    adminUserRegister,
    adminUserRegisterView,
    adminUsersView,
    approveUser, deleteUser, restrictUser, waitView
} from "../../controllers/admin/adminUsersController.js";
import loggedIn from "../../src/middlewares/loggedIn.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import loadUser from "../../src/middlewares/loadUser.js";
import approved from "../../src/middlewares/approved.js";

const adminUsers = express.Router()

adminUsers.get("/admin/users", loadUser, loggedIn, approved, loadToastMessages, adminUsersView)

adminUsers.get("/admin/login", loadUser, loadToastMessages, adminUserLoginView)
adminUsers.post("/admin/login", adminUserLogin)

adminUsers.get("/admin/register", loadUser, loadToastMessages, adminUserRegisterView)
adminUsers.post("/admin/register", adminUserRegister)

adminUsers.get("/admin/logout", loadUser, loggedIn, loadToastMessages, adminUserLogOut)

adminUsers.get("/admin/users/approve/:id", loadUser, loggedIn, approved,loadToastMessages, approveUser)
adminUsers.get("/admin/users/restrict/:id", loadUser, loggedIn, approved,loadToastMessages, restrictUser)
adminUsers.get("/admin/users/remove/:id", loadUser, loggedIn, approved,loadToastMessages, deleteUser)

adminUsers.get("/admin/wait", loadUser, loggedIn, loadToastMessages, waitView)




export default adminUsers