import jsonDb from "../../model/jsonDb.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";
import {toastTypes} from "../../model/schema/toastTypes.js";

export const adminContentView = async (req, res) => {

    const logoLink = await jsonDb.get(jsonDbSchema.logo)
    const homeContent = await jsonDb.get(jsonDbSchema.home)
    const coursesContent = await jsonDb.get(jsonDbSchema.courses)
    const contactsContent = await jsonDb.get(jsonDbSchema.contacts)
    const gdprContent = await jsonDb.get(jsonDbSchema.gdpr)
    const conditionContent = await jsonDb.get(jsonDbSchema.conditions)
    const facebookLink = await jsonDb.get(jsonDbSchema.facebookLink)
    const instagramLink = await jsonDb.get(jsonDbSchema.instagramLink)
    const xLink = await jsonDb.get(jsonDbSchema.xLink)

    res.render("admin/content", {
        title: 'Obsah',
        homeContent,
        coursesContent,
        contactsContent,
        gdprContent,
        conditionContent,
        facebookLink,
        instagramLink,
        xLink,
        logoLink,
    });
}

export const changeLogo = async (req, res) => {

    const toastMessages = []

    if (req.file) {
        const {filename} = req.file
        await jsonDb.set(jsonDbSchema.logo, filename);
        toastMessages.push({type: toastTypes.normal, title:"Logo nahráno"})
    } else {
        toastMessages.push({type: toastTypes.warning, title:"Logo nebylo vybráno"})
    }
    req.session.toastMessages = toastMessages
    res.redirect('back')
}

export const changeHomeTexts = async (req, res) => {

    const {homeContent, coursesContent, contactsContent, gdprContent, conditionsContent} = req.body;

    await jsonDb.set(jsonDbSchema.home, homeContent);
    await jsonDb.set(jsonDbSchema.courses, coursesContent);
    await jsonDb.set(jsonDbSchema.contacts, contactsContent);
    await jsonDb.set(jsonDbSchema.gdpr, gdprContent);
    await jsonDb.set(jsonDbSchema.conditions, conditionsContent);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Obsah stránek upraven"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}

export const changeSocialLinks = async (req, res) => {

    const {facebookLink, instagramLink, xLink} = req.body;

    await jsonDb.set(jsonDbSchema.facebookLink, facebookLink);
    await jsonDb.set(jsonDbSchema.instagramLink, instagramLink);
    await jsonDb.set(jsonDbSchema.xLink, xLink);

    const toastMessages = []
    toastMessages.push({type: toastTypes.normal, title:"Odkazy upraveny"})
    req.session.toastMessages = toastMessages

    res.redirect('back')
}