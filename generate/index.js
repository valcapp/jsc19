// check for last changes first
if (mdlChanges){
    require('./dashb.js');
    require('./public.js');
    require('./vensim.js');
}
module.exports = {
    mdlString : require('./mdlString.js')(),
    text : require('./pagesText.js')(),
    setup : require('./setup.js')(),
    diagram : require('./diagram.js')
};



