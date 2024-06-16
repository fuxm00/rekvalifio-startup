import {approveUserById, createUser, getAllUsers, getUser, removeUserById} from "../../model/db/users.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminUserRegisterView = async (req, res) => {

    res.render("admin/register", {
        title: 'register', login: false
    });
}

export const adminUserRegister = async (req, res) => {

    const {mail, password} = req.body;

    const toastMessages = []
    !mail ? toastMessages.push({type: toastTypes.warning, title: "Zadejte svůj nový e-mail"}) : null
    !password ? toastMessages.push({type: toastTypes.warning, title: "Zadejte svoje nové heslo"}) : null

    if (toastMessages.length < 1) {
        const user = await createUser(mail, password)
        res.cookie('token', user.token)
        toastMessages.push({type: toastTypes.normal, title: "Registrace proběhla úspěšně."})
        req.session.toastMessages = toastMessages
        res.redirect('/admin')
        return
    }

    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const adminUserLoginView = async (req, res) => {

    res.render("admin/login", {
        title: 'login', login: true
    });
}

export const adminUserLogin = async (req, res) => {

    const {mail, password} = req.body;

    const toastMessages = []
    !mail ? toastMessages.push({type: toastTypes.warning, title: "Zadejte svůj e-mail"}) : null
    !password ? toastMessages.push({type: toastTypes.warning, title: "Zadejte svoje heslo"}) : null

    if (toastMessages.length < 1) {
        const user = await getUser(mail, password)

        if (user) {
            res.cookie('token', user.token)
            toastMessages.push({type: toastTypes.normal, title: "Přihlášení proběhlo úspěšně."})
            req.session.toastMessages = toastMessages
            res.redirect('/admin')
            return
        } else {
            toastMessages.push({type: toastTypes.warning, title: "Chybné jméno nebo heslo"})
            req.session.toastMessages = toastMessages
            res.redirect('back')
            return
        }
    }

    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const adminUsersView = async (req, res) => {

    const users = await getAllUsers()

    const signedInId = res.locals.user.id

    res.render("admin/users", {
        title: 'users', users, signedInId
    });
}

export const adminUserLogOut = async (req, res) => {
    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title: "Odhlášení proběhlo úspěšně."})
    req.session.toastMessages = toastMessages
    res.cookie('token', undefined)
    res.redirect('/admin/login')
}

export const approveUser = async (req, res) => {

    const userId = Number(req.params.id)
    const signedInId = Number(res.locals.user.id)

    const toastMessages = []

    if (userId === signedInId) {
        toastMessages.push({type: toastTypes.warning, title: "Svůj účet nemůžete povolit"})
    } else {
        await approveUserById(userId, true);
        toastMessages.push({type: toastTypes.normal, title: "Uživatel povolen"})
    }
    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const restrictUser = async (req, res) => {

    const userId = Number(req.params.id)
    const signedInId = Number(res.locals.user.id)

    const toastMessages = []

    if (userId === signedInId) {
        toastMessages.push({type: toastTypes.warning, title: "Svůj účet nemůžete omezit"})
    } else {
        await approveUserById(userId, false);
        toastMessages.push({type: toastTypes.normal, title: "Uživatel omezen"})
    }
    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const deleteUser = async (req, res) => {

    const userId = Number(req.params.id)
    const signedInId = Number(res.locals.user.id)

    const toastMessages = []

    if (userId === signedInId) {
        toastMessages.push({type: toastTypes.warning, title: "Svůj účet nemůžete smazat"})
    } else {
        await removeUserById(userId)
        toastMessages.push({type: toastTypes.normal, title: "Uživatel smazán"})
    }
    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const waitView = async (req, res) => {

    if (res.locals.user.isApproved) {
        res.redirect('/admin')
    }

    res.render("admin/wait", {
        title: 'wait',
    });
}