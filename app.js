//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {
    const firstName = req.body.FName;
    const lastName = req.body.LName;
    const email = req.body.email;

    var data =
    {
        "email_address": email,
        "status": "subscribed",
        "merge_fields": {
            "FNAME": firstName,
            "LNAME": lastName
        }
    }


    const jsonData = JSON.stringify(data);
    const url = "https://us20.api.mailchimp.com/3.0/lists/d8043f7aa6/members";
    const options = {
        method: "POST",
        auth: "uje170399@gmail.com:1e58c8ad70d48e654f38308fdc4a6e12-us20"
    }
    const request = https.request(url, options, function (response) {

        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is runnig on port 3000");
})