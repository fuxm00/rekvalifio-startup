import jsonDb from "../../model/jsonDb.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";

export const conditionsView = async (req, res) => {

    const content = await jsonDb.get(jsonDbSchema.conditions)

    res.render("front/conditions", {
        title: 'Obchodní podmínky',
        marked: null,
        content,
    } );
}