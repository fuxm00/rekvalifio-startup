import jsonDb from "../../model/jsonDb.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";

export const contactsView = async (req, res) => {

    const content = await jsonDb.get(jsonDbSchema.contacts)

    res.render("front/contacts", {
        title: 'Kontakty',
        marked: 'contacts',
        content,
    } );
}