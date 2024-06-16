export default (req, res, next) => {

    if (res.locals.user.isApproved) {
        next()
    } else {
        res.redirect('/admin/wait')
    }
}