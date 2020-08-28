function activateCustomization(){
    activateNewTabAdder();
    $(".customizeButton").click(toggleEditMode);
    // $(".addSliderHider, .sliderSubmit").on("click",ev=>$(".addSlider").toggleClass("hidden")); // to hide the add slider button when the add slider form is in show, as if the form replaced the button
    // $(".addChartHider, .chartSubmit").on("click",ev=>$(".addChart").toggleClass("hidden"));
    // $('.tab-pane').each( (i,pane)=> {
    //     selectNameToAdd(pane.id,'slider');
    //     selectNameToAdd(pane.id,'chart');
    // });
    $('.saveDashb').click(saveDashb);
}

const updateTabsObj = (iTab,name) => {
    dashbTabs[iTab] = dashbTabs[iTab]? dashbTabs[iTab] : {};
    dashbTabs[iTab].name = name;
}

const addIo = (iTab,ioType,toAddVar) => {
    dashbTabs[iTab][ioType+'s'] = dashbTabs[iTab][ioType+'s'] || [];
    if (dashbTabs[iTab][ioType+'s'].indexOf(toAddVar)>=0){
        alert(`The ${ioType} "${toAddVar}" is already in view.`);
    }else{
        dashbTabs[iTab][ioType+'s'].push(toAddVar);
        switch(ioType){
            case 'slider':
                addSliderToTab(iTab,toAddVar);
                break;
            case 'chart':
                addChartToTab(iTab,toAddVar);
                break;
            default:
                console.log(`The ioType ${ioType} was not recognized.`)
        }
        // updateView(); //this one doesn't exist anywhere at the moment
    }
}



// function addSelectedVar(ioType){
//     let selectedName = $(`#${ioType}NameSelector`).children("option:selected").attr('value'),
//         selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
//         subsGroup = $(`#${ioType}AdderDiv .subsGroup`),
//         selectedSubs = [];
//     subsGroup.find('.subSelector').each(function(){
//         selectedSubs.push($(this).children("option:selected").attr("value"));
//     });
//     let toAddVar = selectedSubs.length<1 ? selectedVars:
//         selectedVars.filter( v => {
//             let vSubs = v.split("[").slice(-1)[0].replace("]","").split(",");
//             return selectedSubs.every(s=>vSubs.indexOf(s)>=0);
//         });
//     toAddVar.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
//     // console.log(toAddVar);
//     toAddVar = toAddVar[0];
//     if (toAddVar){
//         if (dashbViews.main[ioType+'s'].indexOf(toAddVar)>=0){
//             alert(`The ${ioType} "${toAddVar}" is already in view.`);
//         }else{
//             dashbViews.main[ioType+'s'].push(toAddVar);
//             updateView();
//         }
//     }
// }

const saveDashb = ()=>{
    const   toSend = new jsonForm({tabs:dashbTabs},'dashbForm'),
            form = $('<form>').attr("action","/update-dashb").attr("method","POST");
    for (let key in toSend){
        form.append($(`<input type="text" name="${key}">`).val(toSend[key]));
    }
    $('body').append(form);
    form.submit();

}