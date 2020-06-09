// ACTIVATE SAVE BUTTON
$('#saveButton').on("click", function(){
    let runName = $('#runName').val(),
        run = {},
        form = $('<form>').attr("action","/update-runs").attr("method","POST");
    form.append($('<input type="text" name="runName">').attr("value",runName));
    $("input.io-slider-slide").each(function() {
        run[this.name] = this.valueAsNumber;
    });
    Object.keys(run).forEach((param,i)=>{
        form
            .append($(`<input type="text" name="input${i}">`).attr("value",param))
            .append($(`<input type="text" name="value${i}">`).attr("value",run[param]));
    });
    if(!c0there){
        Object.keys(c0).forEach((c,i)=>{
            form
            .append($(`<input type="text" name="constant${i}">`).attr("value",c))
            .append($(`<input type="text" name="init${i}">`).attr("value",c0[c]));
        });
    }
    $('body').append(form);
    form.submit();
});
