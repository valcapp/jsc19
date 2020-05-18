const path = require("path"),
    fs = require("fs"),
    jsdom = require("jsdom"),
    jquery = require('jquery'),
    {JSDOM} = jsdom,
    appDir = path.resolve(__dirname,'..'),
    sourcePath = path.join(__dirname,'web','index.html'),
    templatePath = path.join(appDir,'views','vensim-template.html'),
    targetPath = path.join(appDir,'views','vensim.ejs');
    // targetFile = fs.createWriteStream(targetPath),
let sliders = {},
    charts = {};

// var sourceFile = fs.readFileSync(sourcePath, "utf8");
// console.log(sourceFile);


JSDOM.fromFile(sourcePath).then(dom => {
    sourceElmts(dom.window);
});

function sourceElmts(window){
    let $ = jquery(window);
    // var document = window.document;
    // identify sliders
    $(".io-slider-slide").each(function(){
        sliders[$(this).attr('name')] = $(this).removeAttr("style");
    });
    $(".io-chart").each(function(){
        charts[$(this).attr('name')] = $(this).removeAttr("style");
    });
    JSDOM.fromFile(templatePath).then(dom => {
        // console.log(window);
        returnElmts(dom);
    });
}

function returnElmts(dom){
    // let $ = window.$;
    let $ = jquery(dom.window),
        slidersRow = $(".slidersDiv .row");
        chartsRow = $(".chartsDiv .row");
    // console.log(slidersRow);

    for (let param in sliders){
        let col = $("<div>").addClass("col").addClass("d-flex"),
            sliderGroup = $("<div>").addClass("sliderGroup"),
            label = $("<label>").attr('for', param).html("<strong>"+param+"</strong>"),
            slider = sliders[param],
            box = $("<div>").addClass("io-slider-box").attr("name",param).html(slider.attr('value'));
        sliderGroup.append(label);
        sliderGroup.append(box);
        sliderGroup.append(sliders[param]);
        col.append(sliderGroup);
        slidersRow.append(col);
    }

    for (let name in charts){
        let col = $("<div>").addClass("col").append(charts[name]);
        chartsRow.append(col);
    }

    let pageString = $('body').html();
    pageString = pageString.replace(/##ejsOpen##/g,"<%");
    pageString = pageString.replace(/##ejsClose##/g,"%>");
    fs.writeFile(targetPath, pageString, function (err) {
        if (err) return console.log(err);
    });
}




