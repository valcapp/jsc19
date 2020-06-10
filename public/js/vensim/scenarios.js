// ACTIVATE SAVE BUTTON
$('#saveButton').on("click", function(){
    let runName = $('#runName').val(),
        run = {},
        form = $('<form>').attr("action","/create-run").attr("method","POST");
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

$('#deleteButton').on("click", function(){
    let runsToDelete = [],
        form = $('<form>').attr("action","/delete-runs").attr("method","POST"),
        checked = $('.deleteRunModal .modal-body').find('input:checked').each(function(){
            runsToDelete.push($(this).attr("name"));
        });
    console.log(runsToDelete);
    runsToDelete.forEach((name)=>{
        form.append($('<input type="text" name="run">').val(name));
    });
    // console.log(form);
    $('body').append(form);
    form.submit();
});

$('.showSaveModal').on("click",function(){
    $('.saveRunModal').removeClass('hidden');
    $('.deleteRunModal').addClass('hidden');
});

$('.showDeleteModal').on("click",function(){
    $('.saveRunModal').addClass('hidden');
    $('.deleteRunModal').removeClass('hidden');
});
