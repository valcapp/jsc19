// get sdTitle and mdlString
mdlChanges = false; 
// sdTitle = 'sd';
require('./generate');

const   express = require('express'),
        bodyParser = require('body-parser'),
        fs = require('fs'),
        app = express(),
        dashbConfig = __dirname + "/public/config/dashbViews.json";

introText = '';
aboutText = '';
linksList = {};
// console.log('from app.js: mdlString = ',mdlString);


// set app views
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
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

app.post("/update-run-view",(req,res)=>{
    // console.log(req.body);
    let newSliders = [],
        newCharts = [],
        view = req.body.view;
    for(let par in req.body){
        if(par.indexOf("slider")>=0){
            newSliders.push(req.body[par]);
        }else if(par.indexOf("chart")>=0){
            newCharts.push(req.body[par]);
        }
    }
    fs.readFile(dashbConfig,function(err,data){
        if (err) throw err;
        let config = JSON.parse(data);
        config[view].sliders = newSliders;
        config[view].charts = newCharts;
        fs.writeFile(dashbConfig,JSON.stringify(config),function(err){
            if (err) throw err;
            console.log("Updated: "+dashbConfig);
            res.redirect('/run');
        });
    });

});

// app.get("/update-run-views",(req,res)=>{
//     let newViews = JSON.parse(req.params.newViews);
//     fs.writeFile(__dirname + "/public/config/dashbViews.json",newViews,function(err){
//         if (err) {console.log(err);}
//         else {
//             console.log(`Updated: ${__dirname}/public/config/dashbViews.json`);
//             console.log(newViews);
//             res.json(newViews);
//         }
//     });
// });

// app.get("/update-run-views",(req,res)=>{
//     console.log('got to /update-run-views! ');
//     console.log(req);
//     res.json({"wait":"forever"});
// });

// launch the app
app.listen(
    3000,
    ()=>{console.log('server running at: \n\n http://localhost:3000/\n');}
);