var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res){
   res.render("search");
});

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body)
            res.render("results", {data: data});
        }
        else{
            res.render("error");
        }
    });
});

const PORT = process.env.PORT || 3000;
const IP = process.env.IP || 'localhost';
     
app.listen(PORT, IP, 
    function(){
     console.log("APP running at "+IP+":"+PORT);
});  