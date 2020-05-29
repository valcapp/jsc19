// load .mdl as a string
const fs = require('fs'),
    path = require('path'),
    sdDir = path.join(path.resolve(__dirname,'..'),'sd'),
    sdFiles = fs.readdirSync(sdDir);

let mdlFile = undefined;
// find mdl file
for (let f of sdFiles){
    if (format = f.split('.').slice(-1)[0]==='mdl'){
        mdlFile = f;
        break;
    }
}
mdlString = '';

if (mdlFile){
    const mdlPath = path.join(sdDir,mdlFile);
    mdlString = fs.readFileSync(mdlPath,"utf8"); 
    mdlString = mdlString.replace("{UTF-8}\n","");
    mdlString = mdlString.slice(0,mdlString.indexOf("\n\\\\\\---///"));
}

exports.mdlString = mdlString;

