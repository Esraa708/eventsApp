let mongoose = require("mongoose");
eventScheama = new mongoose.Schema({
_id:Number,
title:{type:String, required: true },
eventDate:Date,
mainSpeaker: {type:Number, ref:'speakers'},
otherSpeakers:[{type:Number, ref:'speakers'}]

})
mongoose.model("events", eventScheama)
