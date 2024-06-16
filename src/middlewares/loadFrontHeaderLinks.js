import {getFrontHeaderLinks} from "../utils/frontHeaderLinks.js";

export default async (req, res, next) => {

    res.locals.headerLinks = await getFrontHeaderLinks()

    next()
}