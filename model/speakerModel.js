let mongoose = require("mongoose");
// var bcrypt = require(bcrypt);
// var SALT_WORK_FACTOR = 10,
speakerScheama = new mongoose.Schema({
    _id: Number,
    username: { type: String, required: true },
    fullName:{
        fName: String,
        lName: String,
    },
    address: {
        street: String,
        city: String,
        country: String
    },
    age: { type: Number, required: true },
    password:{ type: String, required: true }
})
// speakerScheama.pre(save, function(next) {
//     var user = this;

// // only hash the password if it has been modified (or is new)
// if (!user.isModified('password')) return next();

// // generate a salt
// bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     // hash the password using our new salt
//     bcrypt.hash(user.password, salt, function(err, hash) {
//         if (err) return next(err);

//         // override the cleartext password with the hashed one
//         user.password = hash;
//         next();
//     });
// });


// });
mongoose.model("speakers", speakerScheama)
