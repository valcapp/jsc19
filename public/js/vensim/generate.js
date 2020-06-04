
function populateDashbView(){
    $.getJSON("/config/dashbViews.json", function(viewsObj) {
        dashbViews = viewsObj;
        // console.log(dashbViews);
        createSliders();
        createCharts();
        activateD3();
        activateCustomization();
    });
}

function createSliders(){
    configSliders = dashbViews.main.sliders;
    let slidersRow = $(".slidersDiv .row");
    for (let param of configSliders){
        // console.log(param);
        if(variables[param]){
            let meta = variables[param].meta,
                col = $("<div>").addClass("col d-flex align-items-stretch"),
                sliderGroup = $("<div>").addClass("sliderGroup d-flex align-items-start flex-column justify-content-center"),
                label = $("<label>").attr('for', param).html("<strong>"+param+"</strong>").addClass("mb-auto mx-auto"),
                slider = $('<input type="range">').addClass("io-slider-slide mx-auto").attr("name",param).attr("value",meta.value).attr("min",meta.min).attr("max",meta.max).attr("step",meta.step), // here here here
                output = $("<div>").addClass("mx-auto").html(`&nbsp&nbsp<span class="unit">${meta.unit}</span>`).prepend($('<span>').addClass("io-slider-box mx-auto").attr("name",param).html(slider.attr('value')));
            sliderGroup.append(label);
            sliderGroup.append(output);
            sliderGroup.append(slider);
            col.append(sliderGroup);
            slidersRow.prepend(col);
        }else{
            configSliders.splice(configSliders.indexOf(param),1);
        }
    }
}

function createCharts(){
    configCharts = dashbViews.main.charts;
    let chartsRow = $(".chartsDiv .row");
    for (let name of configCharts){
        if(variables[name]){
            let chart = $('<div>').addClass("io-chart").attr("name",name).attr("varname",name).attr("xaxisname",variables['INITIAL TIME'].meta.unit).attr("yaxisname",variables[name].meta.unit),
                col = $("<div>").addClass("col").append(chart); // here here here
            chartsRow.append(col);
        }else{
            configCharts.splice(configCharts.indexOf(name),1);
        }
    }
}

function activateCustomization(){
    // console.log(dashbViews);
    addSlider();
    addChart();
}

function addSlider(){
    let select = $('#sliderNameSelector').on('change',selectSubscript);
    constantNames.forEach((c)=>{
        option = $('<option>').attr("value",c).html(c);
        select.append(option);
    });
    selectSubscript();
}

function selectSubscript(){
    selectedSliderName = $('#sliderNameSelector').children("option:selected").attr('value');
    selectedConstants = constants.filter(c => variables[c].name===selectedSliderName);
    let subsRanges = variables[selectedConstants[0]].subs,
        adderGroup = $('#sliderAdderDiv div.card-body'),
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

function sendSliderForm(){
    let subsGroup = $('#sliderAdderDiv .subsGroup');
        selectedSubs = [],
        subsGroup.find('.subSelector').each(function(){
            selectedSubs.push($(this).children("option:selected").attr("value"));
        });
    toAddConstant = selectedSubs.length<1? selectedConstants:
        selectedConstants.filter((c)=>{
            let cSubs = c.split("[").slice(-1)[0].replace("]","").split(",");
            return selectedSubs.every(s=>cSubs.indexOf(s)>=0);
        });
    toAddConstant.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
    // console.log(toAddConstant);
    toAddConstant = toAddConstant[0];
    if (toAddConstant){
        if (configSliders.indexOf(toAddConstant)>=0){
            alert(`Slider "${toAddConstant}" is already in view.`);
        }else{
            configSliders.push(toAddConstant);
            updateConfig();
        }
    }
}

function addChart(){

}

function updateConfig(){
    let form = $('<form>').attr("action","/update-run-view").attr("method","POST");
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


