function activateCustomization(){
    activateNewTabAdder();
    $(".customizeButton").click(toggleEditMode);
    // $(".addInputHider, .inputSubmit").on("click",(ev)=>
    //     $(".addInput").toggleClass("hidden")
    // );
    // $(".saveConfigButton").on("click",updateConfigData);
    // $('.tab-pane').each( (i,pane)=>
    //     selectNameToAdd(pane.id,'input')
    // );
    $('.saveSetup').click(saveSetup);
}

const updateTabsObj = (iTab,name) => {
    setupTabs[iTab] = setupTabs[iTab]? setupTabs[iTab] : {};
    setupTabs[iTab].name = name;
}

const addInput = (iTab,ioType,toAddVar) => {
    //ioType is not used in this case, but since this func is passed as argument to another function, this last passes the 3 args by default
    let inputToAdd = {},
        questionToAdd = $(`#pane${iTab} .inputQuestion`).val();
    if (questionToAdd){ inputToAdd.question = questionToAdd; }
    inputToAdd.variable = toAddVar;
    if(!setupTabs[iTab].inputs){setupTabs[iTab].inputs=[]}
    setupTabs[iTab].inputs.push(inputToAdd)
    loadInput(iTab,inputToAdd);
}

// function addSelectedVar(tabId, ioType){
//     const tabIndx = Number(tabId.replace("pane",""));
//     // if (!currentActiveTabs['tab'+tabIndx]) {return;}
//     if (currentActiveTab !== '#tab'+tabIndx ) {return;}
//     const selectedName = $(`#${tabId} .${ioType}NameSelector`).children("option:selected").attr('value'),
//         selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
//         subsGroup = $(`#${tabId} .${ioType}AdderDiv .subsGroup`),
//         selectedSubs = [];
//     subsGroup.find('.subSelector').each(function(){
//         selectedSubs.push($(this).children("option:selected").attr("value"));
//     });
//     let toAddVar = !selectedSubs.length ? selectedVars:
//         selectedVars.filter( v => {
//             const vSubs = v.split("[").slice(-1)[0].replace("]","").split(",");
//             return selectedSubs.every(s=>vSubs.indexOf(s)>=0);
//         });
//     toAddVar.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
//     // console.log(toAddVar);
//     toAddVar = toAddVar[0];
//     // console.log('Adding '+toAddVar);
//     if (toAddVar){
//         // activeTabId = Object.keys(currentActiveTabs).find(key=>currentActiveTabs);
//         let inputToAdd = {},
//             questionToAdd = $(`#${tabId} .inputQuestion`).val();
//         if (questionToAdd){ inputToAdd.question = questionToAdd; }
//         inputToAdd.variable = toAddVar;
//         if(!setupTabs[tabIndx].inputs){setupTabs[tabIndx].inputs=[]}
//         setupTabs[tabIndx].inputs.push(inputToAdd)
//         loadTabInput(tabIndx,inputToAdd);
//     }
// }

const saveSetup = ()=>{
    const   toSend = new jsonForm({tabs:setupTabs},'setupForm'),
            form = $('<form>').attr("action","/update-setup").attr("method","POST");
    for (let key in toSend){
        form.append($(`<input type="text" name="${key}">`).val(toSend[key]));
    }
    $('body').append(form);
    form.submit();

}

// function updateConfigData(){
//     let form = $('<form>').attr("action","/update-setup-view").attr("method","POST");
//     // form.append($('#diagramInput'));
//     Object.keys(setupTabs).forEach((tab,iTab)=>{
//         form.append($(`<input type="text" name="tab${iTab}:{name">`).val(tab.name));
//         tab.inputs,forEach((inpt,iInpt)=>{
//             form.append(`<input type="text"`)
//         });
//     });
//     for(let i=0;i<configSliders.length;i++){
//         form.append($(`<input type="text" name="slider${i}">`).attr("value",configSliders[i]));
//     }
//     for(let i=0;i<configCharts.length;i++){
//         form.append($(`<input type="text" name="chart${i}">`).attr("value",configCharts[i]));
//     }
//     form.append($('<input type="text" name="view">').attr("value","main"));
//     $('body').append(form);
//     form.submit();
// }

// function deleteThis(groupId){
//     let ioType = groupId.split("Id")[0],
//         index = groupId.split("Id")[1],
//         param = GetVariableName(index),
//         ioTypeList = dashbViews.main[ioType+'s'];
//     ioTypeList.splice(ioTypeList.indexOf(param),1);
//     $("#"+groupId).remove();
// }


// function updateView(tabIndx){}
//     setupTabs[tabIndx].inputs.forEach(input=>{
//         if(!document.getElementById("sliderId"+variables[param].index)){
//             addSliderToView(param,edit=true);
//         }
//     });
//     configCharts.forEach(param=>{
//         if(!document.getElementById("chartId"+variables[param].index)){
//             addChartToView(param,edit=true);
//         }
//     });
//     populateRuns();
// }



