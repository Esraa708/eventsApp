const express = require("express");
// let mongoose = require("mongoose")
const eventRouter = express.Router();
require("../model/eventModel");
let mongoose = require("mongoose");
var moment = require('moment');
const speakerRouter = express.Router();
require("../model/speakerModel");
speakerModel = mongoose.model('speakers')
eventsModel = mongoose.model('events')
 //speaker events
  
 eventRouter.get("/myEvent/", (request, response) => {
    speakerModel.findOne({_id:request.session.speaker_id}).then((data) => {
        response.locals.username = data.username;
        }).catch((err) => {
        console.log(err + "");
    }) 

    eventsModel.find({$or:[{mainSpeaker:request.session.speaker_id},{otherSpeakers:request.session.speaker_id}]}).then((data) => {
        response.render("events/userEventsList.ejs",{id:request.session.speaker_id,data:data,moment:moment});
        }).catch((err) => {
        console.log(err + "");
    })   

})
eventRouter.use((request,response,next) =>{
    if(request.session.role == 'admin'){
        response.locals.username = "esraa";
        next();
        
    }else{
        response.redirect('/login');

    }
})
// list all events api
    eventRouter.get("/list", (request, response) => {
        eventsModel.find({}).populate({path:'mainSpeaker otherSpeakers'}).then((data) =>{
                    response.render("events/eventList",{data:data,moment:moment});
                    // response.send(data);


        }).catch((err) =>{
            console.log(err+ " ")
            })

    })

eventRouter.get("/add", (request, response) => {
    speakerModel.find({}).then((data) => {
        response.render("events/addEvent",{data:data});
        // response.send(data);
        }).catch((err) => {
        console.log(err + "");
    })   

})
// add new event api
eventRouter.post("/add", (request, response) => {
    var event = new eventsModel(request.body)
    event.save().then((data) => {
        response.send(data);
    }).catch((err) => {
        console.log(err + "")
    })
})
eventRouter.get("/edit/:id", (request, response) => {
    var speakers=[];
    var event={};
    speakerModel.find({}).then((data) => {
        speakers=data;
        }).catch((err) => {
        console.log(err + "");
    }) 
        
    eventsModel.findOne({_id:request.params.id}).then((data) => {
        console.log(speakers)
        console.log(data);
        event=data
       response.render("events/editEvent",{event:event,speakers:speakers,moment:moment});

    }).catch((err) => {
        console.log(err + "");
    })

})
//edit new event api
eventRouter.post("/edit", (request, response) => {
    eventsModel.updateOne({_id:request.body._id},
        {$set:request.body
      
    }).then((data) => {
            response.send(data);
        }).catch((err) => {
            console.log(err + "")
        })
})
eventRouter.post("/delete", (request, response) => {
    eventsModel.deleteOne({ _id:request.body._id }).then((data) => {
        response.send("deleted");
    }).catch((err) => {
        console.log(err + "")

    })})
   
module.exports=eventRouter;