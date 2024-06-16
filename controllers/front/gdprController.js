import jsonDb from "../../model/jsonDb.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";

export const gdprView = async (req, res) => {

    const content = await jsonDb.get(jsonDbSchema.gdpr)

    res.render("front/gdpr", {
        title: 'Ochrana osobních údajů',
        marked: null,
        content,
    } );
}