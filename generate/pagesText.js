const fs = require('fs'),
    textConfigPath = __dirname + "/../public/config/pagesText.json",
    loadPagesText = ()=>{
        const pagesText = fs.existsSync(textConfigPath) ?
            JSON.parse(fs.readFileSync(textConfigPath)):
            {
                title: sdTitle,
                intro : '',
                about : '',
                links : {"Vensim":"http://vensim.com/"}
            };
        return pagesText;
    };

module.exports = loadPagesText;


