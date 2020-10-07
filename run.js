mdlChanges=true;
sdPath = require('./bin/sdPath.js');
require('./generate');
require('./app.js');

const open = require('open');

(async () => {
    await open("http://localhost:3000/", {app: 'msedge'});
})();