const path = require("path"),
    fs = require("fs"),
    jsdom = require("jsdom"),
    jquery = require('jquery'),
    {JSDOM} = jsdom,
    appDir = path.resolve(__dirname,'..'),
    sourcePath = path.join(appDir,'sd','web','index.html'),
    templatePath = path.join(__dirname,'dashb-template.html'),
    targetPath = path.join(appDir,'views','dashb.ejs');
let sliders = {},
    charts = {};

JSDOM.fromFile(sourcePath).then(dom => {
    sourceElmts(dom.window);
});

function sourceElmts(window){
    let $ = jquery(window);
    // identify sliders
    $(".io-slider-slide").each(function(){
        sliders[$(this).attr('name')] = $(this).removeAttr("style");
    });
    $(".io-chart").each(function(){
        charts[$(this).attr('name')] = $(this).removeAttr("style");
    });
    JSDOM.fromFile(templatePath).then(dom => {
        returnElmts(dom);
    });
}

function returnElmts(dom){
    // let $ = window.$;
    let $ = jquery(dom.window),
        slidersRow = $(".slidersDiv .row");
        chartsRow = $(".chartsDiv .row");

    for (let param in sliders){
        let col = $("<div>").addClass("col d-flex align-items-stretch"),
            sliderGroup = $("<div>").addClass("sliderGroup d-flex align-items-start flex-column justify-content-center"),
            label = $("<label>").attr('for', param).html("<strong>"+param+"</strong>").addClass("mb-auto mx-auto"),
            slider = sliders[param].addClass("mx-auto"),
            box = $("<div>").addClass("io-slider-box mx-auto").attr("name",param).html(slider.attr('value'));
        sliderGroup.append(label);
        sliderGroup.append(box);
        sliderGroup.append(slider);
        col.append(sliderGroup);
        slidersRow.append(col);
    }

    for (let name in charts){
        let col = $("<div>").addClass("col").append(charts[name]);
        chartsRow.append(col);
    }

    let pageString = myParser($('body').html());
    // pageString = pageString.replace(/##ejsOpen##/g,"<%");
    // pageString = pageString.replace(/##ejsClose##/g,"%>");
    fs.writeFile(targetPath, pageString, function (err) {
        if (err) return console.log(err);
    });
}

function myParser(inString){
    const expressions = {
        "<%": /##ejsOpen##/g,
        "%>": /##ejsClose##/g
    };
    let outString=inString;
    for (let key in expressions){
        outString = outString.replace(expressions[key],key);
    }
    return outString;
}




