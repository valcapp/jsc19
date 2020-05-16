resetAllSliders();

// ACTIVATE RESET BUTTON
d3.select("button.resetAll").nodes()[0].onclick = function() {
    resetAllSliders();
    runModel("Current");
};

// ACTIVATE SLIDERS
d3.selectAll("input.io-slider-slide").nodes().forEach(function(i){
    i.oninput = function() {
        // update the number shown for all sliders of this var
        d3.selectAll("div.io-slider-box[name=\"" + i.name + "\"]").text(i.valueAsNumber);
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

