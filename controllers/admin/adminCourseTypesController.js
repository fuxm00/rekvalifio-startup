import {
    createCourseType, getAllCourseTypes, getTypeById, removeTypeById, updateType
} from "../../model/db/courseTypes.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminCoursesTypesView = async (req, res) => {

    const types = await getAllCourseTypes()

    res.render("admin/coursesTypes", {
        title: 'kurzy', types, marked: "types", type: null
    });
}

export const adminCoursesTypeView = async (req, res) => {

    const typeId = req.params.id;
    const type = await getTypeById(typeId);

    const types = await getAllCourseTypes()

    res.render("admin/coursesTypes", {
        title: 'kurzy', types, marked: "types", type: type
    });
}

export const addType = async (req, res) => {

    const {title} = req.body

    const toastMessages = []
    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název typu"}) : null

    if (toastMessages.length < 1) {
        await createCourseType({title})
        toastMessages.push({type: toastTypes.normal, title: "Typ přidán"})
    }

    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const editType = async (req, res) => {

    const {title} = req.body
    const {id: typeId} = req.params;

    const toastMessages = []
    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název typu"}) : null

    if (toastMessages.length < 1) {
        await updateType({title}, typeId)
        toastMessages.push({type: toastTypes.normal, title: "Typ upraven"})
        req.session.toastMessages = toastMessages
        res.redirect('/admin/courses/types')
    } else {
        req.session.toastMessages = toastMessages
        res.redirect('back')
    }
}

export const removeType = async (req, res) => {
    const {id: typeId} = req.params;

    await removeTypeById(typeId);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title: "Typ odstraněn"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}