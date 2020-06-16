const path = require("path"),
    fs = require("fs"),
    jsdom = require("jsdom"),
    jquery = require('jquery'),
    {JSDOM} = jsdom,
    appDir = path.resolve(__dirname,'..'),
    dashbConfigPath = path.join(appDir,'public','config','dashbViews.json'),
    sourcePath = path.join(sdPath,'web','index.html');
    // templatePath = path.join(__dirname,'dashb-template.ejs'),
    // targetPath = path.join(appDir,'views','dashb.ejs');

alreadyConfig = fs.existsSync(dashbConfigPath)? true:false;
if (alreadyConfig){console.log("Already existing: "+dashbConfigPath);}
var forceOverWrite = false;


let sliders = [],
    charts = [];

if(!alreadyConfig || forceOverWrite ){
    JSDOM.fromFile(sourcePath).then(dom => {
        sourceElmts(dom.window);
    });
}

function sourceElmts(window){
    let $ = jquery(window),
        vensSliders=[],
        vensCharts=[];
    
    // identify sliders
    $(".io-slider-slide").each(function(){
        vensSliders.push($(this).attr('name'));
    });
    // identify charts
    $(".io-chart").each(function(){
        vensCharts.push($(this).attr('name'));
    });
    sliders=vensSliders.filter((x)=>Boolean(x));
    charts=vensCharts.filter((x)=>Boolean(x));
    dashbViews = {main: {sliders,charts}};
    
    fs.writeFile(dashbConfigPath, JSON.stringify(dashbViews), function (err) {
        if (err) return console.log(err);
        else return console.log(`Created: ${dashbConfigPath}`);
    });
    
}




