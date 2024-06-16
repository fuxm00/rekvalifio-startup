export default async (req, res, next) => {

    if (req.session.toastMessages) {
        res.locals.toastMessages = req.session.toastMessages
        req.session.toastMessages = null
    } else {
        res.locals.toastMessages = null
    }

    next()
}