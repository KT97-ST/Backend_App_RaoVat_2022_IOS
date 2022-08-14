const { json } = require("body-parser");
var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.listen(3000);


// đọc file json
var fs = require("fs");
const { join } = require("path");
fs.readFile("./config.json", "utf8", function(err, data){
    if(err){throw err};
    var obj = JSON.parse(data);
    //Mongoose kết nói database
    const mongoose = require('mongoose');
    mongoose.connect('mongodb+srv://'+obj.mongodb.username+':'+obj.mongodb.password+'@'+obj.mongodb.server+'/'+obj.mongodb.dbname+'?retryWrites=true&w=majority', function(err){
        if(err){
            console.log("Mongodb connected erro! "+ err);
        }else{
            console.log("Mongodb connected succsessfully.");
        }
    });
});

// body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));

require("./Routes/FileManager")(app);
require("./Routes/Account")(app);
require("./Routes/City")(app);

