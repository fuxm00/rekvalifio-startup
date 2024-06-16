import db from "../db.js";

export const getAllOffers = async () => {
    let query = db('offers').select('*')

    const offers = await query

    return offers
}

export const getOffersByExpiration = async (expired = false) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    let operator

    if (expired === true) {
        operator = "<"
    } else {
        operator = ">"
    }

    let query = db('offers').select('*').where('endDate', operator, todayDate.toISOString())

    const offers = await query

    return offers
}

export const createOffer = async (data) => {
    await db('offers').insert(data)
}

export const getOfferById = async (offerId) => {
    let query = db('offers').select('*')
        .where('id', offerId)
        .first()

    const orders = await query

    return orders
}

export const updateOffer = async (data, offerId) => {
    await db('offers').update(data).where('Id', offerId)
}

export const removeOfferById = async (id) => {
    await db('offers').delete().where('id', id)
}