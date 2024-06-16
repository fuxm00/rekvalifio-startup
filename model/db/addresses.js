import db from "../db.js";

export const createAddress = async (data) => {
    const address = await db('addresses').insert(data)
    return await db('addresses').where('id', address[0]).first()
}

export const getAddressById = async (id) => {
    const address = await db('addresses').select('*').where('id', id).first()

    return address
}