varTypes ={
    5: 'data',
    8 : 'level',
    15 :'time base',
    17 :'auxiliary',
    19 :'game variable',
    22 :'initial',
    23 :'constant',
    24 :'unchengable constant',
    26 :'lookup table',
    27 :'string variable'  
};
mdlStr = mdlString.mdlString;
chunks = mdlStr.split("|\n\n").filter((chunk)=>!chunk.includes("**********************"));
anonymousChunks = [];

// function indx(str,target){
//     let index = str.indexOf(target),
//         length = str.length;
//     return (length+index)%length;
// }

$(document).ready(function(){
    readVarDone = false;
    setInterval(function(){
        if (VensimLoadedFlag == 0){
            return;
        }else if (!readVarDone) {
            readVars();
        }
    },100);
});

function readVars(){
    readVarDone = true;
    variables = {};
    subscripts = {};
    // numVariables = GetNumVariables();
    // console.log(`numVariables = ${numVariables}\nnumChunks = ${numChunks}`)
    for(let i=0; i<GetNumVariables() ;i++){
        let varName = GetVariableName(i);
        variables[varName]={
            index: i,
            // name: varName,
            type: varTypes[GetVariableType(i)]
        };
    }
    //identify subscripts
    for (let i =0; i<chunks.length; i++){
        var lines = chunks[i].split('\n').filter((line)=>line.length>0);
        lines = lines[0].length<1? lines.slice(1):lines;
        // subscripts are defined with column, like countries: UK, France, Spain, Italy
        if (lines[0].trim().slice(-1)===":"){
            let subsName = lines[0].trim().slice(0,-1);
            subscripts[subsName]={
                name: subsName,
                elements: lines[1].replace(/\t/g,"").split(",").map(el=>el.trim()),
                meta: getMeta(lines)
            };
            chunks.splice(i,1);
            i--;
        }
    }
    // identify subscripts of subscripted variables
    for (let variable in variables){
        Object.assign(variables[variable],getSubs(variable));
    }
    // loop across chunks to find metadata
    varNames = [];
    for(let variable in variables){
        let name = variables[variable].name;
        if (varNames.indexOf(variables[variable].name)<0){varNames.push(name);}
    }
    varNames.sort((a,b)=> b.length - a.length); //descending order because a shorter name can be contained in a longer name but not viceversa
    
    varList = Object.keys(variables).sort((a,b)=> b.length - a.length);
    console.log(`varList.legth = ${varList.length} ; GetNumVariables() = ${GetNumVariables()} `);
    unexpectedMeta ={};
    for (let i =0; i<chunks.length; i++){
        var lines = chunks[i].split('\n').filter((line)=>line.length>0);
        for (let iVar of varList){ // for each chunk we loop across variables names to see which variable matches the chunk
            if (lines[0].indexOf(iVar) > -1 && variables[iVar].meta){ unexpectedMeta[`chunk:${lines[0]}, iVar:${iVar}`]=variables[iVar].meta;}
            if (lines[0].indexOf(iVar) > -1 && !variables[iVar].meta){ 
                // console.log(iVar,variables[iVar]);
                variables[iVar].meta=getMeta(lines);
                varList.splice(iVar,1); // once a variable got metadata assigned to it, we don't need to loop over it for the next chunks
                if (variables[iVar].subs){ //if it is a subscripted variable, same meta can be inherited by all subscripted variables that share same name
                    for(let jVar of varList){
                        if( variables[jVar].name === variables[iVar].name && variables[jVar].meta ){ unexpectedMeta[`chunk:${lines[0]}, iVar:${jVar}`]=variables[jVar].meta;}
                        if( variables[jVar].name === variables[iVar].name && !variables[jVar].meta ){
                            variables[jVar].meta = variables[iVar].meta;
                            varList.splice(jVar,1);
                        }
                    }
                }
                break; // once we found a variable that matches the chunk we don't need to check other variables as well, so we break the loop across variables
            }
        }
        anonymousChunks.push(lines[0]); //if the loop across variables didn't break, there was no variable matching the chunk
    }
    
    console.log("variables: ",variables);
    console.log("subscripts: ",subscripts);
    console.log('unexpectedMeta: ',unexpectedMeta);
    console.log("anonymousChunks: ",anonymousChunks);
}

function getSubs(variable){ //returns the name of the variable without subscripts, and its 
    let name = variable,
        subs = false;
    if (variable.slice(-1)==="]"){ //it might be a subscripted variable if last char is "]"
        let subsString = variable.slice(1+variable.lastIndexOf("["),variable.lastIndexOf("]"));
        if (subsString){ //if it doesn't find the opening bracket subs would be undefined
            let varSubs = [],
            elmts = subsString.split(",");
            elmts.forEach((varEl)=>{ //for each element of the variable we check if match any element of the subscript
                for(subscript in subscripts){
                    if (varEl===subscript){
                        varSubs.push(subscript);
                    } else {
                        subscripts[subscript].elements.forEach((subEl)=>{
                            if (varEl===subEl){
                                varSubs.push(subscript);                            
                            }                            
                        });
                    }
                }
            });
            if(varSubs){ //if this is not empty the variable was indeed a subscripted variable
                name = variable.slice(0,variable.lastIndexOf(subsString)-1);
                subs = varSubs;
            } //if there was no match between var elements and subscipts elements the name and subs are the default ones
        }
    }
    name = name.replace(/"/,"");
    return{name,subs};
}
function getMeta(lines){
    let metaLines = lines.filter((line)=>(line.includes("~")&&!line.includes("~~"))); //check if \t~ works as well
    [unit,min,max,step]=new Array(4).fill(undefined);
    if(metaLines[0]){
        let meta = metaLines[0];
        meta = meta.split('~')[1].trim();
        // meta = meta.slice(0,indx(meta,"]"));
        meta = meta.split("[");
        unit = meta[0].trim()?meta[0].trim():undefined;
        if(meta[1]){
            [min,max,step] = meta[1].replace("]","").split(",").map(m=>m.trim()).map(m=>m!="?"?m:undefined);
        }
    }
    let comment = metaLines[1]?metaLines[1].split('~')[1].trim():undefined;
    return {unit,min,max,step,comment};
}
