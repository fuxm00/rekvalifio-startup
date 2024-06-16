import {getFormatedOffers} from "../utils/offers.js";

export default async (req, res, next) => {

    res.locals.offers = await getFormatedOffers()

    next()
}