function activateCustomization(){
    $(".customizeButton").click(displayEditMode);
    $(".addSliderHider, #sliderSubmit").on("click",()=>$(".addSlider").toggleClass("hidden")); // to hide the add slider button when the add slider form is in show, as if the form replaced the button
    $(".addChartHider, #chartSubmit").on("click",()=>$(".addChart").toggleClass("hidden"));
    $(".saveConfigButton").on("click",updateConfigData);
    selectNameToAdd('slider');
    selectNameToAdd('chart');
}

function displayEditMode(){
    $(".editMode").toggleClass("hidden");
}

function selectNameToAdd(ioType){
    let select = $(`#${ioType}NameSelector`).on('change',()=>selectSubscript(ioType)),
        names = (ioType==="slider")? constantNames:varNames;
    $(`#${ioType}Submit`).on('click',()=>addSelectedVar(ioType));
    names.forEach((name)=>{
        option = $('<option>').attr("value",name).html(name);
        select.append(option);
    });
    selectSubscript(ioType);
}

function selectSubscript(ioType){
    let selectedName = $(`#${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsRanges = variables[selectedVars[0]].subs,
        adderGroup = $(`#${ioType}AdderDiv div.card-body`),
        subsGroup = adderGroup.find('.subsGroup').empty();
    if(subsRanges){
        subsRanges.forEach((range)=>{
            let label = $('<label>').addClass('input-group-text').attr("for",range+"SubSelector").html(range),
                select = $('<select>').addClass("custom-select subSelector").attr("id",range+"SubSelector");
            subscripts[range].elements.forEach((elmt)=>{
                let option = $('<option>').attr("value",elmt).html(elmt);
                select.append(option);
            });
            let labelDiv = $('<div>').addClass("input-group-prepend").append(label),
                inputGroup = $('<div>').addClass("input-group mb-3").append(labelDiv).append(select);
            subsGroup.append(inputGroup);
        });
    }
}

function addSelectedVar(ioType){
    let selectedName = $(`#${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsGroup = $(`#${ioType}AdderDiv .subsGroup`),
        selectedSubs = [];
    subsGroup.find('.subSelector').each(function(){
        selectedSubs.push($(this).children("option:selected").attr("value"));
    });
    let toAddVar = selectedSubs.length<1 ? selectedVars:
        selectedVars.filter( v => {
            let vSubs = v.split("[").slice(-1)[0].replace("]","").split(",");
            return selectedSubs.every(s=>vSubs.indexOf(s)>=0);
        });
    toAddVar.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
    // console.log(toAddVar);
    toAddVar = toAddVar[0];
    if (toAddVar){
        if (dashbViews.main[ioType+'s'].indexOf(toAddVar)>=0){
            alert(`The ${ioType} "${toAddVar}" is already in view.`);
        }else{
            dashbViews.main[ioType+'s'].push(toAddVar);
            updateView();
        }
    }
}

function deleteThis(groupId){
    let ioType = groupId.split("Id")[0],
        index = groupId.split("Id")[1],
        param = GetVariableName(index),
        ioTypeList = dashbViews.main[ioType+'s'];
    ioTypeList.splice(ioTypeList.indexOf(param),1);
    $("#"+groupId).remove();
}

function updateView(){
    configSliders.forEach(param=>{
        if(!document.getElementById("sliderId"+variables[param].index)){
            addSliderToView(param,edit=true);
        }
    });
    configCharts.forEach(param=>{
        if(!document.getElementById("chartId"+variables[param].index)){
            addChartToView(param,edit=true);
        }
    });
    populateRuns();
}


function updateConfigData(){
    let form = $('<form>').attr("action","/update-run-view").attr("method","POST");
    form.append($('#diagramInput'));
    for(let i=0;i<configSliders.length;i++){
        form.append($(`<input type="text" name="slider${i}">`).attr("value",configSliders[i]));
    }
    for(let i=0;i<configCharts.length;i++){
        form.append($(`<input type="text" name="chart${i}">`).attr("value",configCharts[i]));
    }
    form.append($('<input type="text" name="view">').attr("value","main"));
    $('body').append(form);
    form.submit();
}
