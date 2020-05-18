fs = require('fs');
path = require('path');

var appDir = path.resolve(__dirname,'..');
var fileName = path.join(appDir,'views','dashb.ejs');

var stream = fs.createWriteStream(fileName);

class Page{
    constructor(){
        this.content = '';
    }
    newLine(str=''){
        this.content += str + "\n";
    }
}

stream.once('open', function() {
    var page = buildPage();
    stream.end(page);
});

function buildPage() {
    var page = new Page();
    // html += "<%- include(\"partials/header.ejs\") %>\n" + "<%- include(\"partials/navbar.ejs\")%>\n";
    // html += "<h1>hello</h1>\n";
    // html += "<%- include(\"partials/footer\") %>";
    page.newLine("<%- include(\"partials/header.ejs\") %>");
    page.newLine("<%- include(\"partials/navbar.ejs\")%>");
    page.newLine();
    page.newLine("<h1>hello</h1>");
    page.newLine();
    page.newLine("<%- include(\"partials/footer\") %>");
    return page.content;
}


