import {getCourseById, getCoursesByCategoryId} from "../../model/db/courses.js";
import {createOrder} from "../../model/db/orders.js";
import jsonDb from "../../model/jsonDb.js";
import {getAllCourseCategories, getCategoryById, getCourseCategoriesOfType} from "../../model/db/courseCategories.js";
import {createAddress} from "../../model/db/addresses.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";
import {getAllCourseTypes, geTypeByTitle} from "../../model/db/courseTypes.js";
import {createParticipant} from "../../model/db/participants.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const coursesView = async (req, res) => {

    let {filter} = req.query;

    let categories
    if (filter) {
        const type = await geTypeByTitle(filter)
        if (!type) {
            categories = await getAllCourseCategories()
            filter = null
        } else {
            categories = await getCourseCategoriesOfType(type.id)
        }
    } else {
        categories = await getAllCourseCategories()
    }

    const content = await jsonDb.get(jsonDbSchema.courses)
    const types = await getAllCourseTypes()

    res.render("front/courses", {
        title: 'Kurzy', marked: 'courses', categories, content, types, filter
    });
}

export const categoryView = async (req, res) => {

    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId)
    const courses = await getCoursesByCategoryId(categoryId);

    res.render("front/category", {
        title: 'Kurzy', marked: 'courses', category, courses,
    });
}

export const orderSummaryView = async (req, res) => {

    const {
        note,
        email,
        phone,
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        mailingFirm,
        mailingName,
        billingIc,
        billingDic,
        mailingStreet,
        mailingCity,
        mailingPostal,
        participants,
        finalPrice
    } = req.session;

    const courseId = req.session.courseId
    let course

    if (courseId) {
        course = await getCourseById(courseId)
    } else {
        res.redirect('/')
    }

    res.render("front/orderSummary", {
        title: 'Kurzy',
        marked: 'courses',
        summary: true,
        course,
        note,
        email,
        phone,
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        mailingFirm,
        mailingName,
        billingIc,
        billingDic,
        mailingStreet,
        mailingCity,
        mailingPostal,
        participants,
        finalPrice
    });
}

export const courseView = async (req, res) => {

    const courseId = req.params.id;
    const course = await getCourseById(courseId);

    res.render("front/course", {
        title: 'Kurz', marked: 'courses', course
    });
}

export const courseOrderView = async (req, res) => {

    const {id: courseId} = req.params;
    const {
        note,
        email,
        phone,
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        mailingFirm,
        mailingName,
        billingIc,
        billingDic,
        mailingStreet,
        mailingCity,
        mailingPostal,
        finalPrice,
        participants
    } = req.session;

    const course = await getCourseById(courseId);

    res.render("front/order", {
        title: 'Kurz',
        marked: 'courses',
        summary: false,
        course,
        note,
        email,
        phone,
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        mailingFirm,
        mailingName,
        billingIc,
        billingDic,
        mailingStreet,
        mailingCity,
        mailingPostal,
        participants,
        finalPrice
    });
}

export const placeOrder = async (req, res) => {

    const {id: courseId} = req.params;
    const {
        note,
        email,
        phone,
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        mailingFirm,
        mailingName,
        billingIc,
        billingDic,
        mailingStreet,
        mailingCity,
        mailingPostal,
        participants,
        finalPrice
    } = req.session;

    const billingAddress = await createAddress({
        firm: billingFirm,
        name: billingName,
        street: billingStreet,
        city: billingCity,
        postal: billingPostal,
        ic: billingIc,
        dic: billingDic
    })

    let mailingAddress

    if (mailingAddress || mailingName || mailingStreet || mailingCity || mailingPostal) {
        mailingAddress = await createAddress({
            firm: mailingFirm,
            name: mailingName,
            street: mailingStreet,
            city: mailingCity,
            postal: mailingPostal,
        })
    }

    const billingAddressId = billingAddress.id;
    const mailingAddressId = mailingAddress ? mailingAddress.id : null

    const order = await createOrder({
        courseId, note, email, phone, billingAddressId, mailingAddressId, price: finalPrice
    })
    req.session.regenerate(function (err) {
    })

    for (const participant of participants) {
        const name = participant.name
        const orderId = order.id
        await createParticipant({name, orderId})
    }

    res.redirect(`/course/order-complete/${order.id}`);
}

export const proceedOrder = async (req, res) => {

    const toastMessages = []

    let participants = []
    for (const key in req.body) {
        if (key.startsWith('participant')) {
            if (req.body[key]) {
                let participant = {name: req.body[key]};
                participants.push(participant)
            }
        }
    }

    participants.length < 1 ? toastMessages.push({
        type: toastTypes.warning, title: "Zadejte alespoň jednoho účastníka"
    }) : req.session.participants = participants

    const {
        billingFirm,
        billingName,
        billingStreet,
        billingCity,
        billingPostal,
        billingIc,
        billingDic,
        mailingFirm,
        mailingName,
        mailingStreet,
        mailingCity,
        mailingPostal,
        email,
        phone,
        note,
        approval
    } = req.body;

    if (billingFirm === "" && billingName === "") {
        toastMessages.push({
            type: toastTypes.warning, title: "Vyplňte název firmy nebo jméno pro fakturaci"
        })
    } else {
        req.session.billingFirm = billingFirm
        req.session.billingName = billingName
    }

    billingStreet === "" ? toastMessages.push({
        type: toastTypes.warning, title: "Vyplňte ulici pro fakturaci"
    }) : req.session.billingStreet = billingStreet

    billingCity === "" ? toastMessages.push({
        type: toastTypes.warning, title: "Vyplňte město pro fakturaci"
    }) : req.session.billingCity = billingCity

    billingPostal === "" ? toastMessages.push({
        type: toastTypes.warning, title: "Vyplňte PSČ pro fakturaci"
    }) : req.session.billingPostal = billingPostal

    !approval ? toastMessages.push({
        type: toastTypes.warning, title: "Pro pokračování musíte souhlasit s obchodními podmínkami"
    }) : null

    req.session.billingIc = billingIc
    req.session.billingDic = billingDic

    req.session.mailingFirm = mailingFirm
    req.session.mailingName = mailingName
    req.session.mailingStreet = mailingStreet
    req.session.mailingCity = mailingCity
    req.session.mailingPostal = mailingPostal

    !email ? toastMessages.push({
        type: toastTypes.warning, title: "Vyplňte kontaktní email"
    }) : req.session.email = email

    !phone ? toastMessages.push({
        type: toastTypes.warning, title: "Vyplňte kontaktní telefon"
    }) : req.session.phone = phone

    req.session.note = note

    req.session.courseId = req.params.id;

    const course = await getCourseById(req.params.id)
    req.session.finalPrice = participants.length * course.price

    req.session.toastMessages = toastMessages

    if (toastMessages.length < 1) {
        res.redirect(`/course/order-summary`);
    } else {
        res.redirect('back');
    }
}

export const orderCompleteView = async (req, res) => {
    const orderId = req.params.id;

    res.render("front/orderComplete", {
        title: 'Kurz', marked: 'courses', orderId,
    });
}



