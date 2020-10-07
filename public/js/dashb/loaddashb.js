
readVarStarted = false;
dashbRuns = {}

setInterval(function(){
    if (VensimLoadedFlag == 0){
        return;
    }else if (!readVarStarted) {
        readVars();
        initConst();
    }
},100);

function initConst(){
    if (c0there){
        $.getJSON("/config/c0.json",function(data){
            c0 = data;
        });
    }else{
        c0 = {};
        constants.map((c)=>{
            c0[c]=GetValueAtTime(c,t0);
        });
    }
    populateDashb();
}

function populateDashb(){

    $.getJSON("/config/dashbTabs.json", data =>{
        dashbTabs = data.tabs.filter(tab=>tab);
        dashbTabs.map(
            (tab,i_tab) => {
                addTab(i_tab,tab.name ? tab.name : 'Tab'+i_tab );
                if (tab.sliders){
                    for (let i=0; i<tab.sliders.length; i++){
                        let param = tab.sliders[i];
                        if (variables[param]) { addSliderToTab(i_tab,param); }
                        else { tab.sliders.splice(tab.sliders.indexOf(param),1); i--; }
                    }
                }
                for (let i=0; i<tab.charts.length; i++){
                    let param = tab.charts[i];
                    if (variables[param]) { addChartToTab(i_tab,param);}
                    else { tab.charts.splice(tab.charts.indexOf(param),1); i--;}
                }
            }
        );
        $(document).ready(()=>$('#tab0').trigger('click'));    
        letPopovers();
        activateD3();
        populateRuns();
        activateCustomization();
    });
}


// const createTabsControl = () => {
//     const tabControl = $('<div class="container editMode hidden tabControl">'),
//             h4 = $('<h4>').text('Change sliders and charts').appendTo(tabControl),
//             p = $('<p>').text('You can now modify the sliders and charts shown in the dashboard views. Any change would be immediately displayed but will not be saved unless you click on the Save button. By clicking the Save button any change made on any of the view (or tabs) will be saved and the page will be automatically reloaded.').appendTo(tabControl),
//             back = $('<button class="btn btn-outline-secondary btn-lg customizeButton" role="button" type="button">').text('Back').appendTo(tabControl),
//             save = $('<button class="btn btn-success btn-lg saveDashb" role="button" >').text('Save Tabs').appendTo(tabControl);
//     return tabControl;
// }



const createTabPane = (i,title)=> {
    // const tabContent = $('#tabContent');
    const activeness = i===1? ' active' : '', 
        pane = $(`<div class="tab-pane fade show${activeness}" id="pane${i}" role="tabpanel">`),
        h4 = $('<h4 class="container">').html(title).appendTo(pane),
        slidersDiv = createSlidersDiv().appendTo(pane),
        hr = $('<div class="container">').html('<hr>').appendTo(pane),
        chartsDiv = createChartsDiv().appendTo(pane);
    return pane;
};

const createSlidersDiv = ()=> {
    const slidersDiv = $('<div class="slidersDiv container">'),
            row = $('<div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 d-flex justify-content-around">').appendTo(slidersDiv),
            lastSlider = createLastSlider().appendTo(row);
    inputCard('slider',addIo).appendTo(slidersDiv);  
    return slidersDiv;
}

const createChartsDiv = ()=>{
    const chartsDiv = $('<div class="chartsDiv container">'),
            row = $('<div class="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 d-flex justify-content-around">').appendTo(chartsDiv),
            lastChart = createLastChart().appendTo(row);
    inputCard('chart',addIo).appendTo(chartsDiv);
    return chartsDiv;
}

const createLastSlider = ()=>{
    const ifHidden = editMode ? "" : "editModeHidden",
        lastSlider = $(`<div class="col lastSlider d-flex align-items-stretch editMode ${ifHidden}">`),
        sliderGroup = $('<div class="sliderGroup d-flex align-items-center flex-column justify-content-center addSlider" type="button" data-toggle="collapse" data-target=".addSliderCollapse" aria-expanded="false">')
            .appendTo(lastSlider),
        label = $('<label class="mx-auto">').html('<strong>Add Slider</strong>').appendTo(sliderGroup),
        img = $('<img src="/img/icons/add.svg" alt="" class="addButton mx-auto">')
        .on('click',ev=> toggleInputCard(ev,".addSlider",".sliderAdderDiv") )
        .appendTo(sliderGroup);
    return lastSlider;
}

const createLastChart = ()=>{
    const ifHidden = editMode ? "" : "editModeHidden",
        lastChart = $(`<div class="col lastChart editMode ${ifHidden}">`),
        chartGroup = $('<div class="d-flex align-items-center flex-column justify-content-center addChart" type="button">')
            .appendTo(lastChart)
        label = $('<label class="mx-auto">').html('<strong>Add Chart</strong>').appendTo(chartGroup),
        img = $('<img src="/img/icons/add.svg" alt="" class="addButton mx-auto">')
            .on('click', ev=> toggleInputCard(ev,".addChart",".chartAdderDiv") )
            .appendTo(chartGroup);
    return lastChart;
}

function addSliderToTab(i_tab, param){ 
    const meta = variables[param].meta,
        // groupId = "sliderId"+variables[param].index,
        // col = $("<div>").addClass("col d-flex align-items-stretch").attr("id",groupId),
        col = $("<div>").addClass("col d-flex align-items-stretch"),
        sliderGroup = $("<div>").addClass("sliderGroup d-flex align-items-start flex-column justify-content-center"),
        label = $("<label>").attr('for', param).html("<strong>"+param+"</strong>").addClass("mb-auto mx-auto"),
        slider = $('<input type="range">').addClass("io-slider-slide mx-auto").attr("name",param).attr("value",c0[param]).attr("min",meta.min).attr("max",meta.max).attr("step",meta.step), // here here here
        output = $("<div>").addClass("mx-auto").html(`&nbsp&nbsp<span class="unit">${meta.unit}</span>`).prepend($('<span>').addClass("io-slider-box mx-auto").attr("name",param).html(slider.attr('value'))),
        info = $('<img type="button" data-container="body" data-toggle="popover" data-placement="bottom">').attr('data-content',meta.comment).attr("src","img/icons/info.svg").addClass("info mx-auto"),
        deleter = $(`<img>`).addClass("deleter editMode").attr("src","/img/icons/add.svg").click(()=>col.remove());
    if (!editMode){deleter.addClass("editModeHidden");}
    sliderGroup.append(label).append(output).append(slider).append(info).append(deleter);
    col.append(sliderGroup);
    $(`#pane${i_tab} .lastSlider`).before(col);
}

function addChartToTab(i_tab,name){
    // let groupId = "chartId"+variables[name].index, //FIXTHIS: needs change because the same graph can be displayed in more than one tab
    const chart = $('<div>').addClass("io-chart io-chart-style").attr("name",name).attr("varname",name).attr("xaxisname",variables['INITIAL TIME'].meta.unit).attr("yaxisname",variables[name].meta.unit),
        info = $('<img type="button" data-container="body" data-toggle="popover" data-placement="top">').attr('data-content',variables[name].meta.comment).attr("src","img/icons/info.svg").addClass("info"),
        deleter = $("<img>").addClass("deleter editMode").attr("src","/img/icons/add.svg").on('click',()=>col.remove()),
        // col = $("<div>").addClass("col").attr("id",groupId).append(chart.append(info)).append(deleter); 
        col = $("<div>").addClass("col").append(chart.append(info)).append(deleter); 
    if (!editMode){deleter.addClass("editModeHidden");}
    // $(".chartsDiv .row").prepend(col);
    $(`#pane${i_tab} .lastChart`).before(col);
    runRuns();
}

function letPopovers(){
    $(function () {
        $('[data-toggle="popover"]').popover();
    });
}

function populateRuns(){
    // check if the json exists
    // you need to get the object first from json
    $.getJSON("/config/dashbRuns.json", function(runsObj) {
        dashbRuns = runsObj;

        runRuns();

        let modal = $('.deleteRunModal .modal-body').empty();
        Object.keys(dashbRuns).forEach((run,i)=>{
            let div = $('<div class="form-check">'),
                checkbox = $('<input type="checkbox" class="form-check-input">').attr("id",i).attr("name",run).appendTo(div),
                label = $('<label class="form-check-label">').attr('for',i).html(run).appendTo(div);
            modal.append(div);
        });
    });

}

const runRuns = () =>{
    runModel('current');
    for (let runName in dashbRuns){
        runModelWithParams(runName,dashbRuns[runName]);
    }
}



