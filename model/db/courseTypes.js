import db from "../db.js";

export const getAllCourseTypes = async () => {
    let query = db('courseTypes').select('*')

    const types = await query

    return types
}

export const createCourseType = async (data) => {
    await db('courseTypes').insert(data)
}

export const getTypeById = async (id) => {
    const type = await db('courseTypes').select('*').where('id', id).first()

    return type
}

export const geTypeByTitle = async (title) => {
    const type = await db('courseTypes').select('*').where('title', title).first()

    return type
}

export const removeTypeById = async (id) => {
    await db('courseTypes').delete().where('id', id)
}

export const updateType = async (data, typeId) => {
    await db('courseTypes').update(data).where('Id', typeId)
}