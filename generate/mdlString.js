// load .mdl as a string
const fs = require('fs'),
    path = require('path'),
    // sdDir = path.join(path.resolve(__dirname,'..'),'sd'),
    sdFiles = fs.readdirSync(sdPath);
    getMdlString = ()=>{

        let mdlFile = undefined;
        // find mdl file
        for (let f of sdFiles){
            if (f.split('.').slice(-1)[0]==='mdl'){
                mdlFile = f;
                break;
            }
        }
        sdTitle = 'sd';
        let variables = '';

        if (mdlFile){
            const mdlPath = path.join(sdPath,mdlFile);
            sdTitle = mdlFile.slice(0,-4);
            variables = fs.readFileSync(mdlPath,"utf8"); 
            variables = variables.replace("{UTF-8}","");
            variables = variables.slice(0,variables.indexOf("\n\\\\\\---///"));
        }
        return variables;
    };

module.exports = getMdlString;
// exports.mdlString = mdlString;

