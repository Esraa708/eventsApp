const express = require("express");
let mongoose = require("mongoose")
const speakerRouter = express.Router();
require("../model/speakerModel");
speakerModel = mongoose.model('speakers')
speakerRouter.get("/profile/:id", (request, response) => {

    speakerModel.findOne({ _id: request.params.id }).then((data) => {
        console.log(data);
        //    response.render("speakers/speakerAdminEdit",{data});
        response.locals.username = data.username;
        response.render("speakers/speakerProfile.ejs", { data: data});

    }).catch((err) => {
        console.log(err + "");
    })

})
speakerRouter.use((request,response,next) =>{
    if(request.session.role == 'admin'){
        response.locals.username = "esraa";

        next()
    }else{
        response.redirect('/login');
    }
})
speakerRouter.get("/list", (request, response) => {
    // response.locals.username = "esraa";
    speakerModel.find({}).then((data) => {

        response.render("speakers/speakerlist.ejs", { data: data });

    }).catch((err) => {
        console.log(err + "");
    })
})
//return speaker form
speakerRouter.get("/add", (request, response) => {
    response.send("speaker add form")

})
//insert
speakerRouter.post("/add", (request, response) => {
    console.log(request.body);
    var speaker = new speakerModel(request.body);
    speaker.save().then((data) => {
        response.send(data);
    }).catch((err) => {
        console.log(err + "")
    })

})
//speaker profile edit
speakerRouter.post("/edit", (request, response) => {
    speakerModel.update({ _id: request.body._id }, {
        $set: {
            name: request.body.name, age: request.body.age,
            password: request.body.password,
            "address.city": request.body.city,
            "address.street": request.body.street,
            "address.country": request.body.country
        }
    }).then((data) => {
        response.send(data);
        // console.log(data)

    }).catch((err) => {
        console.log(err + "")

    })
})
speakerRouter.get("/edit/:id", (request, response) => {
    speakerModel.findOne({ _id: request.params.id }).then((data) => {
        console.log(data.age);
        response.render("speakers/speakerAdminEdit", { data });

    }).catch((err) => {
        console.log(err + "");
    })

})
//delete
speakerRouter.post("/delete/", (request, response) => {
    console.log(request.body)
    speakerModel.deleteOne({ _id: request.body._id }).then((data) => {
        response.send("success");
        // response.redirect('/speaker/list');
    }).catch((err) => {
        console.log(err + "")

    })
})
function getNextSequence(name) {
    var ret = speakerModel.findAndModify(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
        }
    );

    return ret.seq;
}
module.exports = speakerRouter;