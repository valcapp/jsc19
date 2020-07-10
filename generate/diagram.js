const fs = require('fs'),
    appDir = __dirname+'/..',
    imgPath = appDir+'/public/img',
    sketchHref = '/img/sketch.png',
    sketchPath = appDir+'/public/'+sketchHref,
    diagram = fs.readdirSync(imgPath).filter(i=>i.split('.')[0]==='diagram'),
    dashbDiagram = diagram.length>0? 'img/'+diagram[0] :
        fs.existsSync(sketchPath)? sketchHref :
        false;

module.exports = dashbDiagram;




