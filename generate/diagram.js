const fs = require('fs'),
    path = require('path'),
    appDir = path.resolve(__dirname,'..'),
    diagramHref = '/img/diagram.png',
    diagramPath = path.join(appDir,'public',diagramHref),
    sketchHref = '/img/sketch.png',
    sketchPath = path.join(appDir,'public',sketchHref);
// const checkPath = function(filePath,successCallback){
//         fs.access(filePath, (err) => {
//             if (err) {
//                 console.error(err);
//             }else{
//                 successCallback();
//             }
//         });
//     };
// dashbDiagram = false;
// checkPath(sketchPath, ()=> {dashbDiagram = sketchHref;});
// checkPath(diagramPath, ()=> {dashbDiagram = diagramHref;});

dashbDiagram = fs.existsSync(sketchPath)? sketchHref :
    fs.existsSync(diagramPath)? diagramHref :
    false;

