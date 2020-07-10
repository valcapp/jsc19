
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
    $('.setBaseline').click(setBaseline);
    $.getJSON("/config/setupTabs.json", data =>{
        setupTabs = data.tabs;
        setupTabs.filter(tab=>tab).map(
            (tab,i) => {
                addTab(i,tab.name ? tab.name : 'Tab'+i );
                if (tab.inputs){
                    tab.inputs.map(input=>loadTabInput(i,input));
                }
            }
        );
        $(document).ready(()=>$('#tab0').trigger('click'));    
        activateCustomization();
    });
}


const addTab = (i,title)=>{
    const tabToAdd = createTab(i,title).insertBefore('#setupTabs .lastTab'),
        paneToAdd = createTabPane(i,title).appendTo('#tabContent');
    currentActiveTabs = new activeTabsCount();
    
    $(document).ready(()=>{
        const tab = $(`#tab${i}`);
        tab.on('click',function(e){
            e.preventDefault();
            if (currentActiveTabs.check(this.id)){
                enableChangeTabName($(this));
            }
            $(this).tab('show');
        });
        $(document).ready(()=>{
            $('li.lastTab .nav-link').removeClass('active');
        });
    });

};

const loadTabInput = (indexTab, data) => {
    // check if they've got these attributes?
    // const question = input.question,
    //     variable = input.variable;
    const pane = $(`#pane${indexTab}`),
        inputGroup = $('<div>').addClass('form-group'),
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
                .change(ev=>{c0[data.variable]=ev.target.valueAsNumber});
            if (varMeta){
                input.attr('min',varMeta.min).attr('max',varMeta.max).attr('step',varMeta.step)
            }
            pane.find('button.addInput').before(inputGroup);
    } else {
        console.log(`Warning! The variable "${data.variable}" doesn't appear in the model. Try to check the spelling.`)
    }
    // console.log(question,variable);
};
 

const createTab = (i,title)=>{
    const tab = $('<li>').addClass('nav-item'),
        activeness = i===1? ' active' : '',
        link = $(`<a id="tab${i}" data-toggle="tab" role="tab">`).addClass('nav-link'+activeness)
            .attr('href',`#pane${i}`).html(title).appendTo(tab),
        input = $(`<input type="text" name="nameTab${i}" id="#nameTab${i}" value="${title}">`)
            .addClass('hidden nav-link').appendTo(tab);
            
    return tab;
}

const createTabPane = (i,title)=> {
    // const tabContent = $('#tabContent');
    const activeness = i===1? ' active' : '', 
        pane = $(`<div class="tab-pane fade show${activeness}" id="pane${i}" role="tabpanel">`),
        h4 = $('<h4>').html(title).appendTo(pane),
        newInputButton = $('<button type=["button"]>').addClass('btn btn-outline-secondary addInput addInputHider editMode')
            .attr('data-toggle','collapse').attr('data-target','.inputAdderDiv').attr('aria-expanded',"false")
            .html('New Input').appendTo(pane),
        newInputCard = inputCard().appendTo(pane);
        if (!editMode){newInputButton.addClass('hidden');}
    return pane;
};

const inputCard = ()=>{
    const inputAdderDiv = $('<div>').addClass('card collapse container inputAdderDiv editMode hidden'),
        cardBody = $('<div>').addClass('card-body').appendTo(inputAdderDiv),
        cardTitle = $('<h5>').addClass('card-title').html('Add Input').appendTo(cardBody),

        questionGroup = $('<div>').addClass('form-group').appendTo(cardBody),
        questionLabel = $('<label>').html('Question').appendTo(questionGroup),
        questionInput = $('<input type=["text"] placeholder="Enter question">').addClass('form-control inputQuestion').appendTo(questionGroup),
        questionSmall = $('<small>').addClass('form-text text-muted').html('The question to the user represented by the input').appendTo(questionGroup),

        varLabel = $('<label>').html("Variable").appendTo(cardBody),
        varNameGroup = $('<div>').addClass('input-group').appendTo(cardBody),
        varNamePrep = $('<div>').addClass('input-group-prepend').appendTo(varNameGroup),
        nameLabel = $('<label>').addClass('input-group-text').html('Name').appendTo(varNamePrep),
        nameSelect = $('<select>').addClass('custom-select inputNameSelector').appendTo(varNameGroup),
        nameSmall = $('<small>').addClass('form-text text-muted').html('The model variable set by this input').appendTo(cardBody),

        subsGroup = $('<div>').addClass('subsGroup').appendTo(cardBody),

        br = $('<br>').appendTo(cardBody),
        buttonsGroup = $('<div>').addClass('buttonsGroup').appendTo(cardBody),
        backButton = $('<button type="button" data-toggle="collapse" data-target=".inputAdderDiv" aria-expanded="false">')
            .addClass('btn btn-outline-secondary addInputHider').html('Back').appendTo(buttonsGroup),
        addButton = $('<button type="button" data-toggle="collapse" data-target=".inputAdderDiv" aria-expanded="false">')
            .addClass('btn btn-primary inputSubmit').html('Add').appendTo(buttonsGroup);
    return inputAdderDiv;
};




// function populateDashbView(){
//     $.getJSON("/config/dashbViews.json", function(viewsObj) {
//         dashbViews = viewsObj;
//         configSliders = dashbViews.main.sliders;
//         for (let i=0; i<configSliders.length; i++){
//             let param = configSliders[i];
//             if (variables[param]) { addSliderToView(param); }
//             else { configSliders.splice(configSliders.indexOf(param),1); i--; }
//         }
//         configCharts = dashbViews.main.charts;
//         for (let i=0; i<configCharts.length; i++){
//             let param = configCharts[i];
//             if (variables[param]) { addChartToView(param);}
//             else { configCharts.splice(configCharts.indexOf(param),1); i--;}
//         }
//         letPopovers();
//         activateD3();
//         populateRuns();
//         activateCustomization();
//     });
// }




