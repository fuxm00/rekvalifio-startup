import db from "../db.js";

export const getAllCourseCategories = async () => {
    let query = db('courseCategories').select('*')

    const categories = await query

    return categories
}

export const getCourseCategoriesOfType = async (id) => {
    let query = db('courseCategories').select('*').where('typeId', id)

    const categories = await query

    return categories
}

export const createCategory = async (data) => {
    await db('courseCategories').insert(data)
}

export const getCategoryById = async (id) => {
    const category = await db('courseCategories').select('*').where('id', id).first()

    return category
}

export const updateCategory = async (data, categryId) => {
    await db('courseCategories').update(data).where('Id', categryId)
}

export const removeCategoryById = async (id) => {
    await db('courseCategories').delete().where('id', id)
}