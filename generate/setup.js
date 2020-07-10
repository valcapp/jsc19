// generate config file for setup page if not existing already
const   fs = require("fs"),
        setupConfigPath = __dirname+'/../public/config/setupTabs.json',
        loadSetupConfig = ()=>{
            let setupConfig;
            if (fs.existsSync(setupConfigPath)) {
                setupConfig = JSON.parse(fs.readFileSync(setupConfigPath));
            } else {
                setupConfig = { main:{}};
                fs.writeFileSync(setupConfigPath,JSON.stringify(setupConfig));
            }
            return setupConfig;
        };

module.exports = loadSetupConfig;