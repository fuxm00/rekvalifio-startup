import express from "express";
import contacts from "../routes/front/contacts.js";
import home from "../routes/front/home.js";
import courses from "../routes/front/courses.js";
import admin from "../routes/admin/admin.js";
import adminCourses from "../routes/admin/adminCourses.js";
import adminOrders from "../routes/admin/adminOrders.js";
import adminContent from "../routes/admin/adminContent.js";
import session from "express-session";
import conditions from "../routes/front/conditions.js";
import gdpr from "../routes/front/gdpr.js";
import adminUsers from "../routes/admin/adminUsers.js";
import adminOffers from "../routes/admin/adminOffers.js";
import "dotenv/config.js";
import cookieParser from "cookie-parser";

export const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    }
))

app.use(home)
app.use(contacts)
app.use(courses)
app.use(conditions)
app.use(gdpr)

app.use(admin)
app.use(adminCourses)
app.use(adminOrders)
app.use(adminContent)
app.use(adminOffers)
app.use(adminUsers)

app.use((req, res) => {
    console.log('404', req.method, req.url)
    res.render('404')
})
