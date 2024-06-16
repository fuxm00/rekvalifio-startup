import jsonDb from "../../model/jsonDb.js";
import {jsonDbSchema} from "../../model/schema/jsonDbSchema.js";

export const getFrontHeaderLinks = async () => {
    const logoName = await jsonDb.get(jsonDbSchema.logo)
    const facebookLink = await jsonDb.get(jsonDbSchema.facebookLink)
    const instagramLink = await jsonDb.get(jsonDbSchema.instagramLink)
    const xLink = await jsonDb.get(jsonDbSchema.xLink)

    return {logoName: logoName, facebookLink: facebookLink, instagramLink: instagramLink, xLink: xLink}
}