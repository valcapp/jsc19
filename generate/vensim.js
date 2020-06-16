const path = require("path"),
    fs = require("fs"),
    jsdom = require("jsdom"),
    jquery = require('jquery'),
    {JSDOM} = jsdom,
    appDir = path.resolve(__dirname,'..'),
    sourcePath = path.join(sdPath,'web','index.html'),
    templatePath = path.join(__dirname,'vensim-template.ejs'),
    targetPath = path.join(appDir,'views','vensim.ejs');

var sourceSketch;

JSDOM.fromFile(sourcePath).then(dom => {
    sourceElmts(dom.window);
});

function sourceElmts(window){
    let $ = jquery(window);
    // identify sketchDiv
    sourceSketch = $("div.sketch");
    $('img',sourceSketch).attr("src","/img/sketch.png");
    JSDOM.fromFile(templatePath).then(dom => {
        returnElmts(dom);
    });
}

function returnElmts(dom){
    // let $ = window.$;
    let $ = jquery(dom.window),
        targetSketch = $(".sketchDiv");

    targetSketch.append(sourceSketch);

    let pageString = myParser($('body').html());
    fs.writeFile(targetPath, pageString, function (err) {
        if (err) return console.log(err);
    });
}

function myParser(inString){
    const expressions = {
        "<%": /&lt;%/g,
        "%>": /%&gt;/g
    };
    let outString=inString;
    for (let key in expressions){
        outString = outString.replace(expressions[key],key);
    }
    // console.log(outString);
    return outString;
}




