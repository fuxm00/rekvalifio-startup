import express from "express";
import loggedIn from "../../src/middlewares/loggedIn.js";
import {
    adminOrdersArchive,
    adminOrdersArchiveView, adminOrdersComplete,
    adminOrdersUnArchive, adminOrdersUnComplete,
    adminOrdersView, adminOrderView, deleteOrder
} from "../../controllers/admin/adminOrdersController.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import loadUser from "../../src/middlewares/loadUser.js";
import approved from "../../src/middlewares/approved.js";

const orders = express.Router()

orders.get("/admin/orders", loadUser, loggedIn, approved, loadToastMessages, adminOrdersView)
orders.get("/admin/orders/archive", loadUser, loggedIn, approved, loadToastMessages, adminOrdersArchiveView)
orders.get("/admin/orders/archiveOrder/:id", loadUser, loggedIn, approved, loadToastMessages, adminOrdersArchive)
orders.get("/admin/orders/unArchiveOrder/:id", loadUser, loggedIn, approved, loadToastMessages, adminOrdersUnArchive)
orders.get("/admin/orders/:id", loadUser, loggedIn, approved, loadToastMessages, adminOrderView)
orders.get("/admin/orders/completeOrder/:id", loadUser, loggedIn, approved, loadToastMessages, adminOrdersComplete)
orders.get("/admin/orders/unCompleteOrder/:id", loadUser, loggedIn, approved, loadToastMessages, adminOrdersUnComplete)
orders.get("/admin/orders/delete/:id", loadUser, loggedIn, approved, loadToastMessages, deleteOrder)

export default orders