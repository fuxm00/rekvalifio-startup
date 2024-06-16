import {
    archiveOrderById, completeOrderById, removeOrderById
} from "../../model/db/orders.js";
import {getCompleteOrder, getFormatedArchivedOrders, getFormatedOrders} from "../../src/utils/orders.js";
import {toastTypes} from "../../model/schema/toastTypes.js";
import {getAddressById} from "../../model/db/addresses.js";

export const adminOrdersView = async (req, res) => {

    const orders = await getFormatedOrders()

    for (const order of orders) {
        order.billingAddress = await getAddressById(order.billingAddressId)
    }

    res.render("admin/orders", {
        title: 'Objednávky', orders, archivedList: false, marked: "orders"
    });
}

export const adminOrdersArchiveView = async (req, res) => {

    const orders = await getFormatedArchivedOrders()

    for (const order of orders) {
        order.billingAddress = await getAddressById(order.billingAddressId)
    }

    res.render("admin/orders", {
        title: 'Archiv objednávek', orders, archivedList: true, marked: "archive"
    });
}

export const adminOrderView = async (req, res) => {

    const orderId = req.params.id;

    const order = await getCompleteOrder(orderId)
    const toastMessages = res.locals.toastMessages

    res.render("admin/order", {
        title: 'Objednávka', order, toastMessages
    });
}

export const adminOrdersArchive = async (req, res) => {

    const orderId = req.params.id;

    await archiveOrderById(orderId, true);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Objednávka archivována"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const adminOrdersUnArchive = async (req, res) => {

    const orderId = req.params.id;

    await archiveOrderById(orderId, false);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Objednávka odarchivována"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const adminOrdersComplete = async (req, res) => {

    const orderId = req.params.id;

    await completeOrderById(orderId, true);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Objednávka dokončena"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const adminOrdersUnComplete = async (req, res) => {

    const orderId = req.params.id;

    await completeOrderById(orderId, false);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Objednávka není dokončena"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const deleteOrder = async (req, res) => {

    const orderId = req.params.id;

    await removeOrderById(orderId)

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Objednávka smazána"})
    req.session.toastMessages = toastMessages

    res.redirect('/admin/orders')
}