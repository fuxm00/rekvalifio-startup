import {
    createCourse, getCourseById, removeCourseById, updateCourse
} from "../../model/db/courses.js";
import {
    getAllCourseCategories,
} from "../../model/db/courseCategories.js";
import {getCoursesWithCategory} from "../../src/utils/courses.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminCoursesView = async (req, res) => {

    const courses = await getCoursesWithCategory()
    const categories = await getAllCourseCategories()
    const sessionCourse = req.session.sessionCourse

    res.render("admin/courses", {
        title: 'kurzy', courses, course: null, marked: "courses", categories,sessionCourse
    });
}

export const adminCourseView = async (req, res) => {

    req.session.sessionCourse = null

    const courseId = req.params.id;
    const course = await getCourseById(courseId);
    const courses = await getCoursesWithCategory()
    const categories = await getAllCourseCategories()

    res.render("admin/courses", {
        title: 'Kurz', course, marked: 'courses', categories, courses, sessionCourse: null
    });
}

export const addCourse = async (req, res) => {

    const {title, courseContent: content, category: categoryId, price} = req.body

    const toastMessages = []
    const sessionCourse = {}

    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název kurzu"}) : sessionCourse.title = title
    !categoryId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte kategorii kurzu"}) : sessionCourse.categoryId = Number(categoryId)
    !price ? toastMessages.push({type: toastTypes.warning, title: "Zadejte cenu kurzu"}) : sessionCourse.price = price
    sessionCourse.content = content

    if (toastMessages.length < 1) {
        await createCourse({title, content, categoryId, price})
        toastMessages.push({type: toastTypes.normal, title: "Kurz přidán"})
        req.session.sessionCourse = null
    } else {
        req.session.sessionCourse = sessionCourse
    }

    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const editCourse = async (req, res) => {

    req.session.sessionCourse = null

    const {title, courseContent: content, category: categoryId, price} = req.body
    const {id: courseId} = req.params;
    const toastMessages = []

    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název kurzu"}) : null
    !categoryId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte kategorii kurzu"}) : null
    !price ? toastMessages.push({type: toastTypes.warning, title: "Zadejte cenu kurzu"}) : null

    if (toastMessages.length < 1) {
        await updateCourse({title, content, categoryId, price}, courseId)
        toastMessages.push({type: toastTypes.normal, title: "Kurz upraven"})
        req.session.toastMessages = toastMessages
        res.redirect('/admin/courses')
    } else {
        req.session.toastMessages = toastMessages
        res.redirect('back')
    }


}

export const removeCourse = async (req, res) => {
    const {id: courseId} = req.params;

    await removeCourseById(courseId);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title: "Kurz smazán"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}