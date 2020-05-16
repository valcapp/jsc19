var express = require('express'),
    app = express();

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/vensim",(req,res)=>{
    res.render("vensim");
});

app.get("/vensim-orig",(req,res)=>{
    res.render("vensim-original");
});

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/links",(req,res)=>{
    res.render("links");
});

app.listen(
    3000,
    ()=>{console.log('app is running');}
);