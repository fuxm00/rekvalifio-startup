import express from "express";
import {
    addCourse, adminCoursesView, adminCourseView, editCourse, removeCourse
} from "../../controllers/admin/adminCoursesController.js";
import {
    addCategory, adminCoursesCategoriesView, adminCoursesCategoryView, editCategory, removeCategory
} from "../../controllers/admin/adminCourseCateoriesController.js";
import {
    addType, adminCoursesTypesView, adminCoursesTypeView, editType, removeType
} from "../../controllers/admin/adminCourseTypesController.js";
import loggedIn from "../../src/middlewares/loggedIn.js";
import loadToastMessages from "../../src/middlewares/loadToastMessages.js";
import loadUser from "../../src/middlewares/loadUser.js";
import approved from "../../src/middlewares/approved.js";

const adminCourses = express.Router()

adminCourses.get("/admin/courses/categories", loadUser, loggedIn, approved, loadToastMessages, adminCoursesCategoriesView)
adminCourses.get("/admin/courses/categories/:id", loadUser, loggedIn, approved, loadToastMessages, adminCoursesCategoryView)
adminCourses.get("/admin/courses/remove-category/:id", loadUser, loggedIn, approved, loadToastMessages, removeCategory)

adminCourses.get("/admin/courses/types", loadUser, loggedIn, approved, loadToastMessages, adminCoursesTypesView)
adminCourses.get("/admin/courses/types/:id", loadUser, loggedIn, approved, loadToastMessages, adminCoursesTypeView)
adminCourses.post("/admin/courses/add-type", loadUser, loggedIn, approved, addType)
adminCourses.post("/admin/courses/edit-type/:id", loadUser, loggedIn, approved, editType)
adminCourses.get("/admin/courses/remove-type/:id", loadUser, loggedIn, approved, loadToastMessages, removeType)

adminCourses.get("/admin/courses", loadUser, loggedIn, approved, loadToastMessages, adminCoursesView)
adminCourses.get("/admin/courses/:id", loadUser, loggedIn, approved, loadToastMessages, adminCourseView)
adminCourses.post("/admin/courses/add-course", loadUser, loggedIn, approved, addCourse)
adminCourses.post("/admin/courses/edit-course/:id", loadUser, loggedIn, approved, editCourse)
adminCourses.get("/admin/courses/remove-course/:id", loadUser, loggedIn, approved, loadToastMessages, removeCourse)

adminCourses.post("/admin/courses/add-category", loadUser, loggedIn, approved, addCategory)
adminCourses.post("/admin/courses/edit-category/:id", loadUser, loggedIn, approved, editCategory)


export default adminCourses