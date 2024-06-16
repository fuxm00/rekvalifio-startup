import db from "../db.js";

export const getAllCourses = async () => {
    let query = db('courses').select('*')

    const courses = await query

    return courses
}

export const createCourse = async (data) => {
    await db('courses').insert(data)
}

export const updateCourse = async (data, courseId) => {
    await db('courses').update(data).where('Id', courseId)
}

export const getCourseById = async (id) => {
    const course = await db('courses').select('*').where('id', id).first()

    return course
}

export const removeCourseById = async (id) => {
    await db('courses').delete().where('id', id)
}

export const getCoursesByCategoryId = async (id) => {
    const courses = await db('courses').select('*')
        .where('categoryId', id)

    return courses
}