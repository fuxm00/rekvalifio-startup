import {getAllCourseCategories} from "../../model/db/courseCategories.js";
import {getTypeById} from "../../model/db/courseTypes.js";

export const getCategoriesWithType = async () => {
    const categories = await getAllCourseCategories()
    for (const category of categories) {
        category.type =  await getTypeById(category.typeId)
    }
    return categories
}