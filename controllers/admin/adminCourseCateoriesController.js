import {
    createCategory, getCategoryById, removeCategoryById, updateCategory
} from "../../model/db/courseCategories.js";
import {getAllCourseTypes, getTypeById} from "../../model/db/courseTypes.js";
import {getCategoriesWithType} from "../../src/utils/categories.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminCoursesCategoriesView = async (req, res) => {

    const categories = await getCategoriesWithType()
    const types = await getAllCourseTypes()
    const sessionCategory = req.session.sessionCategory

    res.render("admin/coursesCategories", {
        title: 'kurzy', categories, marked: "categories", category: null, types, sessionCategory,
    });
}

export const adminCoursesCategoryView = async (req, res) => {

    req.session.sessionCategory = null

    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    const type = category ? await getTypeById(category.typeId) : null
    const categories = await getCategoriesWithType()
    const types = await getAllCourseTypes()

    res.render("admin/coursesCategories", {
        title: 'kurzy', categories, marked: "categories", category: category, types, type, sessionCategory: null
    });
}

export const addCategory = async (req, res) => {

    const {categoryTitle: title, categoryContent: content, typeId} = req.body

    const toastMessages = []
    const sessionCategory = {}

    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název kategorie"}) : sessionCategory.title = title
    !typeId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte typ kategorie"}) : sessionCategory.typeId = Number(typeId)
    sessionCategory.content = content

    if (toastMessages.length < 1) {
        await createCategory({title, content, typeId})
        toastMessages.push({type: toastTypes.normal, title: "Kategorie přidána"})
        req.session.sessionCategory = null
    } else {
        req.session.sessionCategory = sessionCategory
    }

    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const editCategory = async (req, res) => {

    req.session.sessionCategory = null

    const {categoryTitle: title, categoryContent: content, typeId} = req.body
    const {id: categoryId} = req.params;

    const toastMessages = []

    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název kategorie"}) : null
    !typeId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte typ kategorie"}) : null


    if (toastMessages.length < 1) {
        await updateCategory({title, content, typeId}, categoryId)
        toastMessages.push({type: toastTypes.normal, title: "Kategorie upravena"})
        req.session.toastMessages = toastMessages
        res.redirect('/admin/courses/categories')
    } else {
        req.session.toastMessages = toastMessages
        res.redirect('back')
    }
}

export const removeCategory = async (req, res) => {
    const {id: categoryId} = req.params;

    await removeCategoryById(categoryId);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title: "Kategorie odstraněna"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}