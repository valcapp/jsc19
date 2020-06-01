
function populateDashbView(){
    // console.log("variables: ",variables);
    // console.log(Object.keys(variables));
    $.getJSON("/config/dashbViews.json", function(dashbViews) {
        // console.log(dashbViews); 
        // console.log(dashbViews.main.sliders,dashbViews.main.charts);
        createSliders(dashbViews.main.sliders);
        createCharts(dashbViews.main.charts);
        activateD3();
        // console.log(variables);
    });
}

function createSliders(sliders){
    let slidersRow = $(".slidersDiv .row");
    for (let param of sliders){
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
            slidersRow.append(col);
        }
    }
}

function createCharts(charts){
    let chartsRow = $(".chartsDiv .row");
    for (let name of charts){
        let chart = $('<div>').addClass("io-chart").attr("name",name).attr("varname",name).attr("xaxisname",variables['INITIAL TIME'].meta.unit).attr("yaxisname",variables[name].meta.unit),
            col = $("<div>").addClass("col").append(chart); // here here here
        chartsRow.append(col);
    }
}
