const fs = require('fs'),
    path = require('path'),
    appDir = path.resolve(__dirname,'..'),
    imgPath = path.join(appDir,'public','img'),
    // diagramHref = '/img/diagram.png',
    // diagramPath = path.join(appDir,'public',diagramHref),
    sketchHref = '/img/sketch.png',
    sketchPath = path.join(appDir,'public',sketchHref),
    diagram = fs.readdirSync(imgPath).filter(i=>i.split('.')[0]==='diagram');

dashbDiagram = diagram.length>0? path.join('img',diagram[0]) :
    fs.existsSync(sketchPath)? sketchHref :
    false;
// dashbDiagram = fs.existsSync(sketchPath)? sketchHref :
//     fs.existsSync(diagramPath)? diagramHref :
//         false;




