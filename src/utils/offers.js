import {getAllOffers, getOffersByExpiration} from "../../model/db/offers.js";
import {formatDate} from "./formatDate.js";
import {getCategoryById} from "../../model/db/courseCategories.js";

export const getFormatedOffers = async (expired = false) => {

    const offers = await getOffersByExpiration(expired)
    for (const offer of offers) {
        offer.formatedStartDate =  await formatDate(offer.startDate, 'D. M.')
        offer.formatedEndDate =  await formatDate(offer.endDate, 'D. M. YYYY')
    }
    return offers
}

export const getFormatedOffersWithCategory = async (expired = false) => {
    const offers = await getFormatedOffers(expired);
    for (const offer of offers) {
        offer.category = await getCategoryById(offer.categoryId)
    }
    return offers
}