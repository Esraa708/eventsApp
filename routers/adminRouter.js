const express = require("express");
const adminRouter = express.Router();
adminRouter.get("/admin/profile", (request, response) => {
    if (request.session.role == 'admin') {
        response.locals.username = "esraa";
        response.render('admin/admin.ejs');
    } else {
        response.redirect('/login');
    }
})
module.exports = adminRouter;
