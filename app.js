//jshint esversion:6
require('dotenv').config();
const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


var accountSid = process.env.ACCOUNTSID; // Your Account SID from www.twilio.com/console
var authToken = process.env.AUTHTOKEN;   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

app.get("/", function(req, res){
  res.render("index");
});

app.post("/", function(req, res){
client.messages.create({
    from: process.env.TWILIO_NUMBER, // From a valid Twilio number
    to: req.body.number,  // Text this number
    body: String(req.body.message) // SMS Message
})
.then((message) => console.log(message.sid)).done();
res.send("Message has been sent");
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
