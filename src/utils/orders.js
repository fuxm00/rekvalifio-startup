import {getAllArchivedOrders, getAllNonArchivedOrders, getOrderById} from "../../model/db/orders.js";
import {formatDate} from "./formatDate.js";
import {getCourseById} from "../../model/db/courses.js";
import {getAddressById} from "../../model/db/addresses.js";
import {getParticipantsbyOrderId} from "../../model/db/participants.js";

export const getFormatedOrders = async () => {
    const orders = await getAllNonArchivedOrders();
    for (const order of orders) {
        order.formatedDate = await formatDate(order.createdAt, 'D. M. YYYY')
    }
    return orders
}

export const getFormatedArchivedOrders = async () => {
    const orders = await getAllArchivedOrders();
    for (const order of orders) {
        order.formatedDate = await formatDate(order.createdAt, 'D. M. YYYY')
    }
    return orders
}

export const getCompleteOrder = async (orderId) => {
    const order = await getOrderById(orderId);
    order.formatedDate = await formatDate(order.createdAt, 'D. M. YYYY')
    order.course = await getCourseById(order.courseId);
    order.billingAdress = await getAddressById(order.billingAddressId);
    order.mailingAddress = await getAddressById(order.mailingAddressId);
    order.participants = await getParticipantsbyOrderId(order.id)
    return order
}