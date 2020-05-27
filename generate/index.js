require('./dashb.js');
if (!debugMode){
    require('./public.js');
    require('./vensim.js');
}
diag = require('./diagram.js');
require('./variables.js');
debugMode=false;

