const express = require('express'),
    path = require('path'),
    app = express();

// generate files
require(path.join(__dirname,'generate','dashb.js'));
debugMode = true;
if(!debugMode){
    require(path.join(__dirname,'generate','publicMdl.js'));
}

// set app views
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/run",(req,res)=>{
    res.render("dashb");
});

app.get("/vensim",(req,res)=>{
    res.render("vensim");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/links",(req,res)=>{
    res.render("links");
});

// launch the app
app.listen(
    3000,
    ()=>{console.log('server running at: \n\n http://localhost:3000/\n');}
);