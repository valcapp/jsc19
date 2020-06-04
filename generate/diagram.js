const fs = require('fs'),
    path = require('path'),
    appDir = path.resolve(__dirname,'..'),
    diagramHref = '/img/diagram.png',
    diagramPath = path.join(appDir,'public',diagramHref),
    sketchHref = '/img/sketch.png',
    sketchPath = path.join(appDir,'public',sketchHref);

dashbDiagram = fs.existsSync(sketchPath)? sketchHref :
    fs.existsSync(diagramPath)? diagramHref :
        false;




