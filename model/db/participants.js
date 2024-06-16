import db from "../db.js";

export const createParticipant = async (data) => {
    const order = await db('participants').insert(data)
    return await db('participants').where('id', order[0]).first()
}

export const getParticipantsbyOrderId = async (id) => {
    let query = db('participants').select('*').where('orderId', id)

    const participants = await query

    return participants
}