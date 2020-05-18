var express = require('express'),
    path = require('path');
    app = express();

require(path.join(__dirname,'generate','dashb.js'));
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

app.listen(
    3000,
    ()=>{console.log('app running on PORT: 3000\nSee the web page at: \n\n http://localhost:3000/\n');}
);