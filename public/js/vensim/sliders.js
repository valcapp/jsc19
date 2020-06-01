function startOff(){
    resetAllSliders();
    runModel("Current");
}

function activateD3(){
    startOff();

    // ACTIVATE RESET BUTTON
    // $('.resetAll').on('click',startOff);

    d3.selectAll(".resetAll").nodes().forEach(function(i){
        i.onclick = startOff;
    });

    // ACTIVATE SLIDERS
    d3.selectAll("input.io-slider-slide").nodes().forEach(function(i){
        i.oninput = function() {
            // update the number shown for all sliders of this var
            d3.selectAll(".io-slider-box[name=\"" + i.name + "\"]").text(i.valueAsNumber);
            d3.selectAll("input.io-slider-slide[name=\"" + i.name + "\"]").each(function() { this.value = i.valueAsNumber; });
            runModel("Current");
        };
    });

    // ACTIVATE SAVE BUTTON
    d3.select('#saveButton').on("click", function(){
        runName = d3.select('#runName').nodes()[0];
        runModel(runName.value);
        runName.value = '';
    });
}

