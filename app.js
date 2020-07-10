sdPath = require('./bin/sdPath.js');
mdlChanges = false; 
const   gen = require('./generate');
// those are used in the ejs views, hence I declare them globally
mdlString = gen.mdlString,
pagesText = gen.text,
setupTabs = gen.setup,
dashbDiagram = gen.diagram;
const   fs = require('fs'),
        express = require('express'),
        bodyParser = require('body-parser'),
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
        jf = require('./public/js/utils/jsonForm'),
        setupConfig = __dirname + "/public/config/setupTabs.json",
        dashbConfig = __dirname + "/public/config/dashbViews.json",
        c0Config = __dirname + "/public/config/c0.json",
        runsConfig = __dirname + "/public/config/dashbRuns.json";


diagramWidth = dashbDiagram? sizeOf(path.join('public',dashbDiagram)).width : false;

c0there = fs.existsSync(c0Config);

// set app views
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    lastVisitedPage = "/";
    res.render("home");
});

dashbEditMode = false;
app.get("/run",(req,res)=>{
    lastVisitedPage = "/run";
    res.render("dashb");
});

app.get("/vensim",(req,res)=>{
    res.render("vensim");
});

app.get("/about",(req,res)=>{
    lastVisitedPage = "/about";
    res.render("about");
});

app.get("/setup",(req,res)=>{
    lastVisitedPage = "/setup";
    res.render("setup");
});

app.get("/links",(req,res)=>{
    lastVisitedPage = "/links";
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
        fs.writeFile(dashbConfig,JSON.stringify(config, null, 4),function(err){
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
        fs.writeFileSync(c0Config,JSON.stringify(c0, null, 4));
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
    fs.writeFile(runsConfig,JSON.stringify(config, null, 4),function(err){
        if (err) throw err;
        console.log("Updated: "+runsConfig);
        res.redirect('/run');
    });
});

app.post("/delete-runs",(req,res)=>{
    data = req.body.run;
    let runsToDelete = Array.isArray(data)? data : [data] ;
    // console.log(runsToDelete);
    if (fs.existsSync(runsConfig)){
        let config = JSON.parse(fs.readFileSync(runsConfig));
        runsToDelete.forEach( run => delete config[run] );
        fs.writeFile(runsConfig,JSON.stringify(config, null, 4),function(err){
            if (err) throw err;
            console.log("Updated: "+runsConfig);
            res.redirect('/run');
        });
    } else {
        res.redirect('/run');
    }
});

app.post('/upload-diagram', upload.single('diagram'), (req, res) => {
    if(req.file) {
        // console.log(req.file);
        dashbDiagram = path.join('img','diagram'+path.extname(req.file.originalname));
        diagramWidth = sizeOf(path.join('public',dashbDiagram)).width;
        res.redirect('/run');
    }
    else throw 'error';
});

app.get("/edit-site",(req,res)=>{
    res.render("editSite");
});

// pages structure
let pagesSections={
    home: ['title','intro'],
    about: ['about']
};

app.post("/update-pages/:page",(req,res)=>{
    // res.send(req.params.page);
    page = req.params.page;
    pagesSections[page].forEach((section)=>{
        pagesText[section]=req.body[section+'Text'];
    });
    fs.writeFile(textConfig,JSON.stringify(pagesText, null, 4),function(err){
        if (err) throw err;
        loadPagesText();
        let next = (page === 'home')? "/" : "/"+page;
        res.redirect(next);
    });
});

app.post("/add-to-links-page",(req,res)=>{
    let removeLink = req.body.removeLink,
        removeLinks = Array.isArray(removeLink)? removeLink : [removeLink],
        newLink = req.body.linkDescription,
        newUrl = req.body.linkUrl;
    removeLinks.forEach(link => delete pagesText.links[link]);
    pagesText.links[newLink]= newUrl ;
    fs.writeFile(textConfig,JSON.stringify(pagesText, null, 4),function(err){
        if (err) throw err;
        loadPagesText();
        res.redirect("/links");
    });
});

app.post("/set-baseline",(req,res) => {
    let c0 = {};
    Object.keys(req.body)
        .filter((par)=>par.indexOf("constant")>=0)
        .map((par)=>{
            let index = par.replace("constant","");
            c0[req.body[par]] = req.body["init"+index];
    });
    if (Object.keys(c0).length>0){
        fs.writeFile(c0Config,JSON.stringify(c0, null, 4),err=>{
            if (err) throw err;
            res.redirect('/run');
        });
    }
});

app.post("/update-setup",(req,res)=>{
    let data = req.body,
        setupForm = {};
    Object.keys(data)
        .filter( key => key.indexOf('setupForm')===0)
        .map( key => setupForm[key]=data[key]);
    setupData = jf.read(setupForm,'setupForm');
    fs.writeFile(setupConfig,JSON.stringify(setupData, null, 4), err => {
        if (err) throw err;
        res.redirect("/setup");
    });
})

lastVisitedPage="/";
// launch the app
app.listen(3000,()=>{
    console.log("\n--------------------------------------\n");
    console.log('   server running at: \n\n   http://localhost:3000/\n');
    console.log("--------------------------------------\n");
    // request('http://localhost:3000/init/', { json: true }, (err, res, body) => {
    // if (err) { return console.log(err); }
    // console.log(body);
    // });
});
