const   fs = require('fs'),
        env = fs.existsSync(".env")? require('dotenv').config(): null,
        getSdPath = ()=>{
        if(env){
            if (env.error) {
                throw env.error;
            }
        }
        if(typeof(sdPath) === 'undefined'){
            sdPath = __dirname+"/../sd";
            if(process.env.SD_PATH){
                if (!fs.existsSync(process.env.SD_PATH)){
                    console.log(`The path to the sd-folder specified in the .env file is not working\n${process.env.SD_PATH}`);
                }else{
                    sdPath = process.env.SD_PATH;
                }
            }
            if(!fs.existsSync(sdPath)){
                throw new Error(`Failed to connect to path:\n${sdPath}\nMake sure the correct path to the sd folder is specified: either \n> copy and paste the sd working folder inside the app dir or  > modify the .env`);
            }
        }
        return sdPath;
    };

module.exports = getSdPath();