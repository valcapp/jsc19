
editMode = false; 

function activateCustomization(){
    activateNewTabAdder();
    $(".customizeButton").click(toggleEditMode);
    $(".addInputHider, .inputSubmit").on("click",(ev)=>
        $(".addInput").toggleClass("hidden")
    );
    // $(".saveConfigButton").on("click",updateConfigData);
    $('.tab-pane').each( (i,pane)=>
        selectNameToAdd(pane.id,'input')
    );
    $('.saveSetup').click(saveSetup);
}

function toggleEditMode(){
    $(".editMode").toggleClass("hidden");
    editMode = editMode? false : true;
}

// the following I think is more complicated than needed
// probably I could just keep the name of the current active tab into a var
class activeTabsCount {
    constructor(){
        $('#setupTabs a.nav-link').each((i,tab)=>{
            if(tab.id){
                this[tab.id]=false;
            }
        });
    }
    check(tabId){
        Object.keys(this)
            .filter( tab => !(tab === tabId))
            .map( tab => this[tab]=false );
        if (this[tabId] && editMode){
            return true;
        }else{
            this[tabId]=true;
            return false;
        }
    }
}


const enableChangeTabName = (title)=>{
    title.addClass('hidden');
    const tab = title.parents('li');
    const input = tab.find('input').removeClass('hidden').focus().select();
    const outTabListener = ev => {               
        if (!$(ev.target).closest(tab).length) {
            closeEditTabName();
        }
    };
    const closeEditTabName = () =>{
        $(document).off('click', outTabListener);
        title.removeClass('hidden');
        input.addClass('hidden');
    };

    input.on('keyup',(ev)=>{
        const keyCode = ev.which;
        // console.log(ev.which,ev.key);
        if (keyCode === 27){
            closeEditTabName();
        } else if (keyCode === 13){
            let newName = input.val().trim();
            newName = newName===''?
                "Tab " + title.attr('name').replace("nameTab",""):
                newName;
            changeTabName(title,newName);
            closeEditTabName();
        }
    });
    $(document).on('click', outTabListener);
};

const changeTabName = (title,newName)=> {
    const i = title.attr('id').replace("tab","");
    title.html(newName);
    setupTabs[i].name = newName;
    $('#pane'+i).find('h4').html(newName);
};

function activateNewTabAdder(){
    const lastTab = $('li.lastTab');
    lastTab.on('click',function(){
        $('.tab-pane.active').removeClass('active');
        const n = $('#setupTabs li').length - 1;
            newTabsN = $.map( $('#setupTabs a.nav-link'), el => $(el).text())
                .filter(x=>x.indexOf('New Tab ')>=0).length + 1;
        addTab(n,'New Tab '+newTabsN);
        $(document).ready(()=>{
            const tab = $(`#tab${n}`);
            tab.tab('show');
            tab.addClass('active')[0].click();
            tab[0].click();
        });
    });
}

function selectNameToAdd(tabId,ioType){
    let select = $(`#${tabId} .${ioType}NameSelector`).on('change',()=>
            selectSubscript(tabId,ioType)),
        names = (ioType==="input")? constantNames:varNames;
    $(`.${ioType}Submit`).on('click',()=>addSelectedVar(tabId,ioType));
    names.forEach((name)=>{
        option = $('<option>').attr("value",name).html(name);
        select.append(option);
    });
    selectSubscript(tabId,ioType);
}

function selectSubscript(tabId,ioType){
    let selectedName = $(`#${tabId} .${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsRanges = variables[selectedVars[0]].subs,
        adderGroup = $(`#${tabId} .${ioType}AdderDiv div.card-body`),
        subsGroup = adderGroup.find('.subsGroup').empty();
    if(subsRanges){
        subsRanges.forEach((range,i)=>{
            const label = $('<label>').addClass('input-group-text').html(range),
                select = $('<select>').addClass("custom-select subSelector");
            subscripts[range].elements.forEach((elmt)=>{
                const option = $('<option>').attr("value",elmt).html(elmt);
                select.append(option);
            });
            const labelDiv = $('<div>').addClass("input-group-prepend").append(label),
                inputGroup = $('<div>').addClass("input-group mb-3").append(labelDiv).append(select);
            subsGroup.append(inputGroup);
        });
    }
}

function addSelectedVar(tabId, ioType){
    const tabIndx = Number(tabId.replace("pane",""));
    if (!currentActiveTabs['tab'+tabIndx]) {return;}
    const selectedName = $(`#${tabId} .${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsGroup = $(`#${tabId} .${ioType}AdderDiv .subsGroup`),
        selectedSubs = [];
    subsGroup.find('.subSelector').each(function(){
        selectedSubs.push($(this).children("option:selected").attr("value"));
    });
    let toAddVar = !selectedSubs.length ? selectedVars:
        selectedVars.filter( v => {
            const vSubs = v.split("[").slice(-1)[0].replace("]","").split(",");
            return selectedSubs.every(s=>vSubs.indexOf(s)>=0);
        });
    toAddVar.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
    // console.log(toAddVar);
    toAddVar = toAddVar[0];
    console.log('wanting to add '+toAddVar);
    if (toAddVar){
        // activeTabId = Object.keys(currentActiveTabs).find(key=>currentActiveTabs);
        let inputToAdd = {},
            questionToAdd = $(`#${tabId} .inputQuestion`).val();
        if (questionToAdd){ inputToAdd.question = questionToAdd; }
        inputToAdd.variable = toAddVar;
        setupTabs[tabIndx].inputs.push(inputToAdd)
        loadTabInput(tabIndx,inputToAdd);
    //     if (dashbViews.main[ioType+'s'].indexOf(toAddVar)>=0){
    //         alert(`The ${ioType} "${toAddVar}" is already in view.`);
    //     }else{
    //         dashbViews.main[ioType+'s'].push(toAddVar);
    //         updateView();
    //     }
    }
}

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



