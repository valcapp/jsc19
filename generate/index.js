require('./dashb.js');
if (!debugMode){
    require('./public.js');
    require('./vensim.js');
}
mdlString = require('./mdlString.js');
require('./diagram.js');
debugMode=false;



