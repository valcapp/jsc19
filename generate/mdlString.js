// load .mdl as a string
const fs = require('fs'),
    path = require('path'),
    // sdDir = path.join(path.resolve(__dirname,'..'),'sd'),
    sdFiles = fs.readdirSync(sdPath);

let mdlFile = undefined;
// find mdl file
for (let f of sdFiles){
    if (f.split('.').slice(-1)[0]==='mdl'){
        mdlFile = f;
        break;
    }
}
sdTitle = 'sd';
mdlString = '';

if (mdlFile){
    const mdlPath = path.join(sdPath,mdlFile);
    sdTitle = mdlFile.slice(0,-4);
    mdlString = fs.readFileSync(mdlPath,"utf8"); 
    mdlString = mdlString.replace("{UTF-8}","");
    mdlString = mdlString.slice(0,mdlString.indexOf("\n\\\\\\---///"));
}

exports.mdlString = mdlString;

