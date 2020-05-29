// load .mdl as a string
const fs = require('fs'),
    path = require('path'),
    appDir = path.resolve(__dirname,'..'),
    sdDir = path.join(appDir,'sd'),
    // publicJS = path.join(appDir,'public','js','vensim'),
    sdFiles = fs.readdirSync(sdDir);

// require(path.join(publicJS,'charts.js'));
// require(path.join(publicJS,'mdl.js'));
// let vesm = require(path.join(publicJS,'vensim_wasm.js'));


let mdlFile = undefined;
// find mdl file
for (let f of sdFiles){
    if (format = f.split('.').slice(-1)[0]==='mdl'){
        mdlFile = f;
        break;
    }
}
variables = {};

// couple of useful functions
function strTill(str,brk){
    let brkIndex = str.indexOf(brk);
    let newStr;
    if (brkIndex > -1){
        newStr = str.slice(0,brkIndex);
    }else{
        newStr = str;
    }
    return newStr;
}
function firstIndex(str,target){
    let index = str.indexOf(target),
        length = str.length;
    // if (index<0){
    //     index = str.length;
    // }
    return (length+index)%length;
}

if (mdlFile){
    const mdlPath = path.join(sdDir,mdlFile);
    let mdlString = fs.readFileSync(mdlPath,"utf8"); 
    mdlString = mdlString.replace("{UTF-8}\n","");
    mdlString = mdlString.slice(0,mdlString.indexOf("\n\\\\\\---///"));

    // break into variables
    let varChunks = mdlString.split("|\n\n").filter((chunk)=>!chunk.includes("**********************"));
    for (let chunk of varChunks){
        let eqIndex = Math.min(firstIndex(chunk,"="),firstIndex(chunk,":"));
        let varName = chunk.slice(0,eqIndex).trim();
        varName = strTill(varName,'[');
        // identify unit, val, min, max, comments
        let varLines = chunk.slice(eqIndex+1).split('\n');
        // varLines = varBody;
        varLines = varLines[0].length<1? varLines.slice(1):varLines;
        let value = varLines[0].replace("\t","").replace("~~|","").trim();
        let metaLines = varLines.filter((line)=>(line.includes("~")&&!line.includes("~~")));
        if(metaLines[0]){
            let meta = metaLines[0];
            meta = meta.split('~')[1].trim();
            meta = strTill(meta,']');
            [unit,min,max,step] = meta.split(/\[|,/);
        }else{
            [unit,min,max,step]=new Array(4).fill(undefined);
        }
        let comment = metaLines[1]?metaLines[1].split('~')[1].trim():undefined;

        variables[varName]={
            unit:unit,
            value:value,
            min:min,
            max:max,
            step:step,
            comment:comment
        };
    }
    console.log(variables);

// save them into an object

}