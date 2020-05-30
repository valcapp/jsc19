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
    unexpectedMeta ={};
    unmatchedChunks = [];
    checkChunks = {varNames,unexpectedMeta,unmatchedChunks};
    for (let i =0; i<chunks.length; i++){
        let lines = chunks[i].split('\n').filter((line)=>line.length>0),
            meta = getMeta(lines);
        for (let iName of varNames){ // for each chunk we loop across variables names to see which variable matches the chunk
            match = lines[0].indexOf(iName) > -1;
            if (match){
                // console.log(`Is "${iName}" contained in "${lines[0]}"? `, match );
                iVars = Object.keys(variables).filter((v)=>variables[v].name===iName);
                iVars.map((iVar)=>{if(variables[iVar].meta){unexpectedMeta[iVar]=variables[iVar].meta;}});
                iVars.map((iVar)=>{variables[iVar].meta = meta;});
                varNames.splice(varNames.indexOf(iName),1); // once a variable got metadata assigned to it, we don't need to loop over it for the next chunks
                break; // once we found a variable that matches the chunk we don't need to check other variables as well, so we break the loop across variables
            }
        }
        if (!match){unmatchedChunks.push(lines[0]);}//if the loop across variables didn't break, there was no variable matching the chunk
    }
    // console.log("subscripts: ",subscripts);
    // console.log("checkChunks: ",checkChunks);
    // console.log("variables: ",variables);
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
    name = name.replace(/"/g,"");
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
