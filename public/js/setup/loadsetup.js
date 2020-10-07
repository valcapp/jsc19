
readVarStarted = false;

setInterval(function(){
    if (VensimLoadedFlag === 0){
        return;
    }else if (!readVarStarted) {
        readVars();
        initConst();
        // activateCustomization();
    }
},100);

function initConst(){
    if (c0there){
        $.getJSON("/config/c0.json",function(data){
            c0 = data;
            populateSetup();
        });
    }else{
        c0 = {};
        constants.map((c)=>{
            c0[c]=GetValueAtTime(c,t0);
        });
        populateSetup();
    }
}

const setBaseline = () => {
    form = $('<form>').attr("action","/set-baseline").attr("method","POST");
    Object.keys(c0).forEach((c,i)=>{
        form
        .append($(`<input type="text" name="constant${i}">`).attr("value",c))
        .append($(`<input type="text" name="init${i}">`).attr("value",c0[c]));
    });
    $('body').append(form);
    form.submit();
}

function populateSetup(){
    $('.setBaseline').on('click', setBaseline);
    $.getJSON("/config/setupTabs.json", data =>{
        setupTabs = data.tabs;
        setupTabs.filter(tab=>tab).map(
            (tab,i) => {
                addTab(i,tab.name ? tab.name : 'Tab'+i );
                if (tab.inputs){
                    tab.inputs.map(input=>loadInput(i,input));
                }
            }
        );
        $(()=>$('#tab0').trigger('click'));    
        activateCustomization();
    });
}

const loadInput = (indexTab, data) => {
    // check if they've got these attributes?
    // const question = input.question,
    //     variable = input.variable;
    const pane = $(`#pane${indexTab}`),
        inputGroup = $('<div>').addClass('form-group inputGroup').on({
            mouseenter: () => editMode? inputGroup.addClass('highlighted') : null,
            mouseleave: () => editMode? inputGroup.removeClass('highlighted') : null
        }),
        question = data.question? $('<p>').addClass('question').html(`<strong>${data.question}</strong>`).appendTo(inputGroup):null,
        varInfo = variables[data.variable],
        varMeta = varInfo? varInfo.meta? varInfo.meta : null : null;
    if (varInfo){
        const inputSubGroup = $('<div>').addClass('row justify-content-start align-items-center').appendTo(inputGroup),
            label = $('<label>').addClass('col-12 col-sm-6 col-lg-4')
                .html(data.variable.replace('"','')).appendTo(inputSubGroup),
            unit = varMeta? $('<span>').addClass('unit col-2 col-sm-1').html(varMeta.unit).appendTo(inputSubGroup) : null,
            input = $(`<input type="number" name="var${varInfo.index}">`).val(c0[data.variable])
                .addClass('col-6 col-sm-3 col-lg-2 form-control setupInput').appendTo(inputSubGroup)
                .on('change',ev=>{c0[data.variable]=ev.target.valueAsNumber}),
            deleter = $("<img>").addClass("deleter editMode ").attr("src","/img/icons/add.svg")
                .on('click',()=>inputGroup.remove()).appendTo(inputGroup);
            if (!editMode){deleter.addClass("editModeHidden");}
            if (varMeta){
                input.attr('min',varMeta.min).attr('max',varMeta.max).attr('step',varMeta.step)
            }
            pane.find('button.addInput').before(inputGroup);
    } else {
        console.log(`Warning! The variable "${data.variable}" doesn't appear in the model. Try to check the spelling.`)
    }
    // console.log(question,variable);
};

const createTabPane = (i,title)=> {
    // const tabContent = $('#tabContent');
    const activeness = i===1? ' active' : '', 
        pane = $(`<div class="tab-pane fade show${activeness}" id="pane${i}" role="tabpanel">`),
        h4 = $('<h4>').html(title).appendTo(pane),
        newInputButton = $('<button type=["button"]>').addClass('btn btn-outline-secondary addInput editMode')
            .on('click', ev => toggleInputCard(ev,'.addInput',".inputAdderDiv"))
            // .attr('data-toggle','collapse').attr('data-target','.inputAdderDiv').attr('aria-expanded',"false")
            .html('New Input').appendTo(pane);
        inputCard('input',addInput,true).appendTo(pane);
        if (!editMode){newInputButton.addClass('editModeHidden');}
    return pane;
};

// const inputCard = (ioType)=>{
//     const inputAdderDiv = $('<div>').addClass(`card container ${ioType}AdderDiv editMode editModeHidden adderDivHidden`),
//         cardBody = $('<div>').addClass('card-body').appendTo(inputAdderDiv),
//         cardTitle = $('<h5>').addClass('card-title').html(`Add ${ioType}`).appendTo(cardBody),

//         varLabel = $('<label>').html("Variable").appendTo(cardBody),
//         varNameGroup = $('<div>').addClass('input-group').appendTo(cardBody),
//         varNamePrep = $('<div>').addClass('input-group-prepend').appendTo(varNameGroup),
//         nameLabel = $('<label>').addClass('input-group-text').html('Name').appendTo(varNamePrep),
//         nameSelect = $('<select>').addClass(`custom-select ${ioType}NameSelector`).appendTo(varNameGroup),
//         nameSmall = $('<small>').addClass('form-text text-muted').html(`The model variable the new ${ioType} will refer to.`).appendTo(cardBody),

//         subsGroup = $('<div>').addClass('subsGroup').appendTo(cardBody),

//         br = $('<br>').appendTo(cardBody),

//         tagToToggle = ".add" + ioType.charAt(0).toUpperCase() + ioType.slice(1)
//         buttonsGroup = $('<div>').addClass('buttonsGroup').appendTo(cardBody),
//         backButton = $(`<button type="button">`)
//             .addClass(`btn btn-outline-secondary`).html('Back')
//             .on('click',ev=>toggleWithinPane(ev,tagToToggle,"adderDivHidden"))
//             .appendTo(buttonsGroup),
//         addButton = $(`<button type="button" data-toggle="collapse" data-target=".${ioType}AdderDiv" aria-expanded="false">`)
//             .addClass(`btn btn-primary ${ioType}Submit`).html('Add')
//             .on('click',ev=>{
//                 toggleWithinPane(ev,tagToToggle,"adderDivHidden");
//                 const iTab = currentPane(ev).id.replace("pane","");
//                 addSelectedVar(iTab,ioType,addInput);
//             })
//             .appendTo(buttonsGroup);
//     return inputAdderDiv;
// };

// const inputCard = ()=>{
//     const inputAdderDiv = $('<div>').addClass('card collapse container inputAdderDiv editMode hidden'),
//         cardBody = $('<div>').addClass('card-body').appendTo(inputAdderDiv),
//         cardTitle = $('<h5>').addClass('card-title').html('Add Input').appendTo(cardBody),

        // questionGroup = $('<div>').addClass('form-group').appendTo(cardBody),
        // questionLabel = $('<label>').html('Question').appendTo(questionGroup),
        // questionInput = $('<input type=["text"] placeholder="Enter question">').addClass('form-control inputQuestion').appendTo(questionGroup),
        // questionSmall = $('<small>').addClass('form-text text-muted').html('The question to the user represented by the input').appendTo(questionGroup),

//         varLabel = $('<label>').html("Variable").appendTo(cardBody),
//         varNameGroup = $('<div>').addClass('input-group').appendTo(cardBody),
//         varNamePrep = $('<div>').addClass('input-group-prepend').appendTo(varNameGroup),
//         nameLabel = $('<label>').addClass('input-group-text').html('Name').appendTo(varNamePrep),
//         nameSelect = $('<select>').addClass('custom-select inputNameSelector').appendTo(varNameGroup),
//         nameSmall = $('<small>').addClass('form-text text-muted').html('The model variable set by this input').appendTo(cardBody),

//         subsGroup = $('<div>').addClass('subsGroup').appendTo(cardBody),

//         br = $('<br>').appendTo(cardBody),
//         buttonsGroup = $('<div>').addClass('buttonsGroup').appendTo(cardBody),
//         backButton = $('<button type="button" data-toggle="collapse" data-target=".inputAdderDiv" aria-expanded="false">')
//             .addClass('btn btn-outline-secondary addInputHider').html('Back').appendTo(buttonsGroup),
//         addButton = $('<button type="button" data-toggle="collapse" data-target=".inputAdderDiv" aria-expanded="false">')
//             .addClass('btn btn-primary inputSubmit').html('Add').appendTo(buttonsGroup);
//     return inputAdderDiv;
// };



