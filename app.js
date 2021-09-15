const express = require("express");
const https = require("https");
const app= express();
const bodyParser = require("body-parser");
const request = require("request");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const Email = req.body.Email;

    const data = {
        members: [
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = ""; //hidden for public safety

    const options = {
        method: "POST",
        auth: ""  //hidden for public safety
    }

    const request = https.request(url, options, function(response){
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

   


    request.write(jsonData);

    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("SERVER UP AND RUNNING, GET READY FOR FULL KOMEDI");
});

//api key
//f254e694c99afa0f8962735ca8a02a29-us6


//audience id
//cf34c2762b
