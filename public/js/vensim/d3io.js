var VensimLoadedFlag = 0;

function OnVensimLoaded()
    {
        VensimLoadedFlag = _IsVensimLoaded();
        runModel("current");
    }


var VensimCharts = [];
var colorList = "1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf".match(/.{6}/g).map(s=>'#'+s); 
// var colorList = ['red','blue','green','orange','purple','turquoise','brown','olive','violet','navy'];

function UpdateCharts(run){
    var margin = {left: 70, right: 30, top: 30, bottom: 50};
    d3.selectAll("div.io-chart").each(function() {
        var div = d3.select(this);
        var width = parseInt(div.style("width"), 10);
        var height = parseInt(div.style("height"), 10);
        var temp = ["0", "0", width, height];
        div.selectAll("svg").data([0]).join("svg").attr("viewBox", temp.join(","));
        var chart = div.select("svg");
        var fTimeVals = GetSeries("Time");
        var varname = div.attr("varname");
        var fVals = GetSeries(varname);
        if (!VensimCharts[varname]) {
            VensimCharts[varname] = { runs: [] };
        }
        var o = VensimCharts[varname];
        o.runs[run] = {
            times: fTimeVals,
            vals: fVals,
        };
        var vmin = Number.MAX_VALUE;
        var vmax = -Number.MAX_VALUE;
        for (r in o.runs) {
            vmin = Math.min(vmin, d3.min(o.runs[r].vals));
            vmax = Math.max(vmax, d3.max(o.runs[r].vals));
        }
        chart.selectAll("text.title")
            .data([0])
            .join("text").attr("class", "title")
            .attr("x", (width - margin.left - margin.right)/2 + margin.left)
            .attr("y", (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(div.attr("name"));
        var xscale = d3.scaleLinear()
            .domain([d3.min(fTimeVals), d3.max(fTimeVals)])
            .range([margin.left, width - margin.right]);
        chart.selectAll("g.xaxis")
            .data([0])
            .join("g").attr("class", "xaxis")
            .attr("transform", "translate(0, " + (height - margin.bottom) + ")")
            .call(d3.axisBottom(xscale).ticks(width / 80).tickSizeOuter(0));
        chart.selectAll("text.xunits")
            .data([0])
            .join("text").attr("class", "xunits")
            .attr("x", (width - margin.left - margin.right)/2 + margin.left)
            .attr("y", height - 14)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(div.attr("xaxisname"));
        var yscale = d3.scaleLinear()
            .domain([vmin, vmax])
            .range([margin.top, height - margin.bottom]);
        var yscale_inv = d3.scaleLinear()
            .domain([vmin, vmax])
            .range([height - margin.bottom, margin.top]);
        chart.selectAll("g.yaxis")
            .data([0])
            .join("g").attr("class", "yaxis")
            .attr("transform", "translate(" + margin.left + ", 0)")
            .call(d3.axisLeft(yscale_inv));
        chart.selectAll("text.yunits")
            .data([0])
            .join("text").attr("class", "yunits")
            .attr("transform", "rotate(-90)")
            .attr("y", 16)
            .attr("x", -(height - margin.top - margin.bottom)/2 - margin.top)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text(div.attr("yaxisname"));
        
        //legend
        // console.log(chart.select('g'));
        chart.select('.legendGroup').remove();
        
        var legendGroup = chart.append('g')
            .attr("class","legendGroup")
            .attr('transform',`translate(${0.7*width},${0.15*height})`);
        var runNames = Object.keys(o.runs);
        var color = d3.scaleOrdinal()
            .domain(runNames)
            .range(colorList.slice(0,runNames.length));
        var legend = d3.legendColor()
            .shape('circle')
            .shapeRadius(4)
            .scale(color)
            .shapePadding(0 );
        legendGroup.call(legend);
        legendGroup.selectAll('text').attr('font-size', '10px');
        
        // console.log(o);
        Object.keys(o.runs).forEach((r,j)=> {
            chart.selectAll("path.data" + j)
            .data([o.runs[r].vals])
            .join("path")
            .attr("class", "data" + j)
            .attr("d", (d, i) => 
                d3.line()
                    .x((d, i) => xscale(o.runs[r].times[i]))
                    .y((d) => height - margin.bottom - yscale(d) + margin.top)(d)
                )
            .attr("stroke", color(r))
            .attr("fill", "none");
        });
    });
}

function resetAllSliders() {
    d3.selectAll("input.io-slider-slide").nodes().forEach(function(i){
        if(c0there){ if(c0[i.name]){i.value = c0[i.name];}}
        else {i.value = i.getAttribute("value");}
        d3.selectAll("div.io-slider-box[name=\"" + i.name + "\"]").text(i.valueAsNumber);
    }); 
}

function runModel(run) {
    if (  VensimLoadedFlag == 0){
        return;
    }
    InitializeModel();
    // set all slider constants
    d3.selectAll("input.io-slider-slide").each(function() {
        //console.log("Setting " + this.name + " to " + this.valueAsNumber);
        SetConstant(this.name, this.valueAsNumber);
    });
    RunSim();
    UpdateCharts(run);
}

function runModelWithParams(run,constants) {
    if (  VensimLoadedFlag == 0){
        return;
    }
    InitializeModel();
    for (let param in constants){
        // console.log(param, Number(constants[param]));
        SetConstant(param, Number(constants[param]));
    }
    RunSim();
    UpdateCharts(run);
}

// function saveRunOnView(run,constants){
//     if (!runsOnView) {
//         runsOnView = {};
//     }
//     if (!run==="current"){
//         runsOnView[run]=constants;
//     }
// }



function activateD3(){
    startOff();

    // ACTIVATE RESET BUTTON
    d3.selectAll(".resetAll").nodes().forEach(function(i){
        i.onclick = startOff;
    });

    // ACTIVATE SLIDERS
    d3.selectAll("input.io-slider-slide").nodes().forEach(function(i){
        i.oninput = function() {
            // update the number shown for all sliders of this var
            d3.selectAll(".io-slider-box[name=\"" + i.name + "\"]").text(i.valueAsNumber);
            d3.selectAll("input.io-slider-slide[name=\"" + i.name + "\"]").each(function() { this.value = i.valueAsNumber; });
            runModel("current");
        };
    });

    window.addEventListener('resize',setChartsHeight);
}

function startOff(){
    resetAllSliders();
    runModel("current");
}

function setChartsHeight(){
    $('.div.io-chart').each((div)=>{
        div.height = div.width*0.85;
    });
    runModel('current');
}





