mdlChanges=true;
sdPath = require('./utils/sdPath.js');
require('./generate');

viewMode = process.argv.includes('viewMode')
require('./app.js');

const open = require('open');
(async () => {
    await open("http://localhost:3000/", {app: 'msedge'});
})();