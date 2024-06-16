import {createOffer, getOfferById, removeOfferById, updateOffer} from "../../model/db/offers.js";
import {getAllCourseCategories} from "../../model/db/courseCategories.js";
import {formatDate} from "../../src/utils/formatDate.js";
import {getFormatedOffersWithCategory} from "../../src/utils/offers.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminOffersView = async (req, res) => {

    const offers = await getFormatedOffersWithCategory()
    const categories = await getAllCourseCategories();
    const todayDate = await formatDate(new Date(), 'YYYY-MM-DD')

    res.render("admin/offers", {
        title: 'Nabídky', offers, offer: null, categories, todayDate,
        marked: "offers", expired: false
    });
}

export const adminExpiredOffersView = async (req, res) => {

    const offers = await getFormatedOffersWithCategory(true)
    const categories = await getAllCourseCategories();
    const todayDate = await formatDate(new Date(), 'YYYY-MM-DD')

    res.render("admin/offers", {
        title: 'Nabídky', offers, offer: null, categories, todayDate,
        marked: "expired", expired: true
    });
}

export const adminOfferView = async (req, res) => {

    const offerId = req.params.id
    const offer = await getOfferById(offerId)
    const offers = await getFormatedOffersWithCategory()
    const categories = await getAllCourseCategories();
    const todayDate = await formatDate(new Date(), 'YYYY-MM-DD')

    res.render("admin/offers", {
        title: 'Nabídky', offers, offer, categories, todayDate, marked: "offers", expired: false
    });
}

export const addOffer = async (req, res) => {

    const {title, offerStart: startDate, offerEnd: endDate, category: categoryId} = req.body

    const toastMessages = []
    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název nabídky"}) : null
    !startDate ? toastMessages.push({type: toastTypes.warning, title: "Zadejte počáteční datum nabídky"}) : null
    !endDate ? toastMessages.push({type: toastTypes.warning, title: "Zadejte koncové datum nabídky"}) : null
    !categoryId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte kategorii nabídky"}) : null

    if (toastMessages.length < 1) {
        await createOffer({title, startDate, endDate, categoryId})
        toastMessages.push({type: toastTypes.normal, title: "Nabídka přidána"})
    }

    req.session.toastMessages = toastMessages

    res.redirect('/admin/offers')
}

export const editOffer = async (req, res) => {

    const {title, offerStart: startDate, offerEnd: endDate, category: categoryId} = req.body
    const {id: offerId} = req.params;

    const toastMessages = []
    !title ? toastMessages.push({type: toastTypes.warning, title: "Zadejte název nabídky"}) : null
    !startDate ? toastMessages.push({type: toastTypes.warning, title: "Zadejte počáteční datum nabídky"}) : null
    !endDate ? toastMessages.push({type: toastTypes.warning, title: "Zadejte koncové datum nabídky"}) : null
    !categoryId ? toastMessages.push({type: toastTypes.warning, title: "Zadejte kategorii nabídky"}) : null

    if (toastMessages.length < 1) {
        await updateOffer({title, startDate, endDate, categoryId}, offerId)
        toastMessages.push({type: toastTypes.normal, title: "Nabídka upravena"})
        req.session.toastMessages = toastMessages
        res.redirect('/admin/offers')
    } else {
        req.session.toastMessages = toastMessages
        res.redirect('back')
    }
}

export const removeOffer = async (req, res) => {
    const {id: offerId} = req.params;

    await removeOfferById(offerId);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title: "Nabídka odstraněna"})
    req.session.toastMessages = toastMessages

    res.redirect('/admin/offers')
}