// get sdTitle and mdlString
mdlChanges = false; 
// sdTitle = 'sd';
require('./generate');

const   express = require('express'),
        bodyParser = require('body-parser'),
        fs = require('fs'),
        path = require('path'),
        multer = require('multer'),
        multerStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                let prevDiagram = fs.readdirSync(path.join('public','img')).filter(i=>i.split('.')[0]==='diagram');
                if (prevDiagram.length>0) {fs.unlinkSync(path.join('public','img',prevDiagram[0]));}
                cb(null, 'public/img');
            },
            filename: (req, file, cb) => {cb(null,'diagram'+path.extname(file.originalname) );}
        }),
        upload = multer({storage: multerStorage}),
        sizeOf = require('image-size'),
        app = express(),
        dashbConfig = __dirname + "/public/config/dashbViews.json",
        c0Config = __dirname + "/public/config/c0.json",
        runsConfig = __dirname + "/public/config/dashbRuns.json";
        // request = require('request');

diagramWidth = dashbDiagram? sizeOf(path.join('public',dashbDiagram)).width : false;
introText = '';
aboutText = '';
linksList = {};
c0there = fs.existsSync(c0Config);
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

    if(req.file){
        console.log(req.file);
    }
    
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

app.post("/create-run",(req,res)=>{
    let c0={},
        newRun = {},
        runName = req.body.runName;

    Object.keys(req.body)
        .filter((par)=>par.indexOf("constant")>=0)
        .map((par)=>{
            let index = par.replace("constant","");
            c0[req.body[par]] = req.body["init"+index];
    });
    if (Object.keys(c0).length>0){
        fs.writeFileSync(c0Config,JSON.stringify(c0));
    }

    
    Object.keys(req.body)
        .filter((par)=>par.indexOf("input")>=0)
        .map((par)=>{
            let index = par.replace("input","");
            newRun[req.body[par]] = req.body["value"+index];
    });
    let config = fs.existsSync(runsConfig)?
        JSON.parse(fs.readFileSync(runsConfig)):
        {};
    config[runName]=newRun;
    fs.writeFile(runsConfig,JSON.stringify(config),function(err){
        if (err) throw err;
        console.log("Updated: "+runsConfig);
        res.redirect('/run');
    });
});

app.post("/delete-runs",(req,res)=>{
    data = req.body.run
    let runsToDelete = Array.isArray(data)? data : [data] ;
    console.log(runsToDelete);
    if (fs.existsSync(runsConfig)){
        let config = JSON.parse(fs.readFileSync(runsConfig));
        runsToDelete.forEach( run => delete config[run] );
        fs.writeFile(runsConfig,JSON.stringify(config),function(err){
            if (err) throw err;
            console.log("Updated: "+runsConfig);
            res.redirect('/run');
        });
    } else {
        res.redirect('/run');
    }
});

app.post('/upload-diagram', upload.single('diagram'), (req, res, next) => {
    if(req.file) {
        // console.log(req.file);
        dashbDiagram = path.join('img','diagram'+path.extname(req.file.originalname));
        diagramWidth = sizeOf(path.join('public',dashbDiagram)).width;
        res.redirect('/run');
    }
    else throw 'error';
});

// app.get("/init",(req,res)=>{
//     res.render("initconst");
// });

// app.post("c0",(req,res)=>{
//     let c0 = {};
//     console.log("hello from c0.");
//     // Object.keys(req.body)
//     // .filter((par)=>par.indexOf("param")>=0)
//     // .map((par)=>{
//     // });
// });

// launch the app
app.listen(3000,()=>{
    console.log('server running at: \n\n http://localhost:3000/\n');
    // request('http://localhost:3000/init/', { json: true }, (err, res, body) => {
    // if (err) { return console.log(err); }
    // console.log(body);
    // });
});