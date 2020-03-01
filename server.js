let express = require("express");
let path = require("path");
let authenticationRouter = require("./routers/authRouter");
let adminRouter = require("./routers/adminRouter")
let speakerRouter = require("./routers/speakerRouter")
let eventRouter = require("./routers/eventsRouter");
// var cookieParser = require('cookie-parser');
var session = require('express-session');
//open the server using express
const server = express();

server.listen(8080, () => {
    console.log("I am listening on 8080....");
})

let mongoose = require("mongoose")
mongoose.connect('mongodb://localhost:27017/EVENTS').then(() => {
    console.log("connected to database")
}).catch((error) => {
    console.log(error + "");
})

server.set('view engine', 'ejs');
server.set("views", path.join(__dirname, "views"))
server.use(express.static(path.join(__dirname, "public")));
server.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
// server.use(express.static(path.join(__dirname,"node_modules","jquery","dist")));
//middleware to check user is sending 
server.use(function (request, response, next) {
    console.log("First Middle ware " + request.method + " : " + request.url);
    // response.send("Welcome to our Our website");
    next();
});
// app.use(cookieParser());
server.use(session({ secret: "esraa" }));
server.get("/home", function (request, response) {
    response.send("HOME Page");
});
server.use(express.urlencoded());
server.use(express.json());
server.use(authenticationRouter);
server.use(function (request, response, next) {
    if (request.session.role) {
        next();
    } else {
        response.redirect('/login')
    }
});
server.use(adminRouter);
server.use("/speaker", speakerRouter);
server.use("/event", eventRouter);

