const express = require("express");
const authenticationRouter = express.Router();
let path = require("path")
let mongoose = require("mongoose")
require("../model/speakerModel");
speakerModel = mongoose.model('speakers')

authenticationRouter.get("/register",(request,response) =>{
    response.render("register.ejs");
})
authenticationRouter.get("/login", (request, response) => {
    // response.send("login");
response.render("authication/login.ejs");

})
authenticationRouter.post("/login", (request, response) => {
    console.log(request.body);
    
    if (request.body.username == "esraa" && request.body.password == "123") {
        request.session.role="admin"        
        response.redirect('/admin/profile')
     
    } else {
        speakerModel.findOne({username:request.body.username,password:request.body.password}).then((data) =>{
            request.session.role="user"
            console.log(data._id)
            request.session.speaker_id=data._id
            console.log(request.session.speaker_id)
            response.locals.username=request.body.username;
            response.redirect('/speaker/profile/');
        }).catch((err) => {
            // response.redirect('/login');
            })

    }
})


module.exports = authenticationRouter;

  // response.sendFile(path.join(__dirname,"..","views","auth","auth.html"))
        // response.redirect('/login')

