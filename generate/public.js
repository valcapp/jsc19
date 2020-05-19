const path = require("path"),
    fs = require("fs"),
    appDir = path.resolve(__dirname,'..'),
    sdWeb = path.join(appDir,'sd','web'),
    sdPublic = path.join(appDir,'public','js','vensim'),
    mdlWeb = path.join(sdWeb,'mdl.js'),
    mdlPublic = path.join(sdPublic,'mdl.js'),
    wasmWeb = path.join(sdWeb,'mdl.wasm'),
    wasmPublic = path.join(sdPublic,'mdl.wasm'),
    sketchWeb = path.join(sdWeb,'sketch.png'),
    sketchPublic = path.join(appDir,'public','img','sketch.png'),

    copyPaste = function(from,to){
        fs.copyFile(from, to, (err) => {
            if (err) throw err;
            // console.log(`\n file copied from:  ${from}\n to:                ${to}`);
        });
    };

copyPaste(mdlWeb,mdlPublic);
copyPaste(wasmWeb,wasmPublic);
copyPaste(sketchWeb,sketchPublic);
