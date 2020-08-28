/**
 * Return the jquery object of an input Card, that allows the user to select a constant or variable, which is eventually passed to the addFunc function
 * @param {string} ioType - the type of input/output we want add as variable, if either 'input' or 'slider' are selected the options available would be only the constants
 * @param {function object} addFunc - the function to be executed when the Add button
 * @param {boolean} inputQuestion - true if we want to attach a text question input before the select var input
 */
const inputCard = (ioType,addFunc,inputQuestion=false)=>{
    const ifEditModeHidden = editMode ? "" : " editModeHidden",
        inputAdderDiv = $('<div>').addClass(`card container ${ioType}AdderDiv adderDivHidden editMode${ifEditModeHidden}`),
        cardBody = $('<div>').addClass('card-body').appendTo(inputAdderDiv),
        cardTitle = $('<h5>').addClass('card-title').html(`Add ${ioType}`).appendTo(cardBody);

    if (inputQuestion){
        const questionGroup = $('<div>').addClass('form-group').appendTo(cardBody),
            questionLabel = $('<label>').html('Question').appendTo(questionGroup),
            questionInput = $('<input type=["text"] placeholder="Enter question">').addClass('form-control inputQuestion').appendTo(questionGroup),
            questionSmall = $('<small>').addClass('form-text text-muted').html('The question to the user represented by the input').appendTo(questionGroup);
    }

    const varLabel = $('<label>').html("Variable").appendTo(cardBody),
        varNameGroup = $('<div>').addClass('input-group').appendTo(cardBody),
        varNamePrep = $('<div>').addClass('input-group-prepend').appendTo(varNameGroup),
        nameLabel = $('<label>').addClass('input-group-text').html('Name').appendTo(varNamePrep),
        nameSelect = $('<select>').addClass(`custom-select ${ioType}NameSelector`).appendTo(varNameGroup),
        nameSmall = $('<small>').addClass('form-text text-muted').html(`The model variable the new ${ioType} will refer to.`).appendTo(cardBody),

        subsGroup = $('<div>').addClass('subsGroup').appendTo(cardBody),

        br = $('<br>').appendTo(cardBody),

        cardOpener = ".add" + ioType.charAt(0).toUpperCase() + ioType.slice(1),

        buttonsGroup = $('<div>').addClass('buttonsGroup').appendTo(cardBody),
        backButton = $(`<button type="button">`)
            .addClass(`btn btn-outline-secondary`).html('Back')
            .on('click',ev=> toggleInputCard(ev,cardOpener,`.${ioType}AdderDiv`) )
            .appendTo(buttonsGroup),
        addButton = $(`<button type="button" data-toggle="collapse" data-target=".${ioType}AdderDiv" aria-expanded="false">`)
            .addClass(`btn btn-primary ${ioType}Submit`).html('Add')
            .on('click',ev=>{
                toggleInputCard(ev,cardOpener,`.${ioType}AdderDiv`);
                const iTab = currentPane(ev).attr('id').replace("pane","");
                addSelectedVar(iTab,ioType,addFunc);
            })
            .appendTo(buttonsGroup);
    return inputAdderDiv;
};

/**
 * toggles the inputCard, so that either the opener or the card are displayed (so they are never displayed together)
 * @param {event object} ev - the user's click, used to idaentify which tab-pane the user refers to
 * @param {string} openerTag - querySelector that opens the input card when clicked (inside the tab-pane where the event happened)
 * @param {string} targetCard - querySelector to identify the inputCard (inside the tab-pane where the event happened)
 */
const toggleInputCard = (ev,openerTag,targetCard) => {
    toggleWithinPane(ev,openerTag,"adderDivHidden");
    toggleWithinPane(ev,targetCard,"adderDivHidden");
}

const enableInputCards = iTab => {
    const ioTypes = ['input','slider','chart'];
    ioTypes
        .filter(iot=>$(`#pane${iTab} .${iot}NameSelector`).length > 0)
        .map(iot=>selectNameToAdd('pane'+iTab,iot))
    // const selectInputs = $(`#pane${iTab} [class*="NameSelector"]`);
    // console.log(selectInputs);
}

/**
 * populates the options for the name select input of the inputCard, and checks the subscript options for each name (on change)
 * @param {string} tabId - the id of the tab-pane containing the input-card
 * @param {string} ioType - the type of input or output to add, it can be input for the setup or slider and chart for the dashboard
 */
function selectNameToAdd(tabId,ioType){
    let select = $(`#${tabId} .${ioType}NameSelector`).on('change',()=>
            selectSubscript(tabId,ioType)
        ),
        names = (ioType==="input"||ioType==="slider")? constantNames:varNames;
    // $(`.${ioType}Submit`).on('click',()=>addSelectedVar(tabId,ioType));
    names.forEach((name)=>{
        option = $('<option>').attr("value",name).html(name);
        select.append(option);
    });
    selectSubscript(tabId,ioType);
}

/**
 * Depending on the variable name currently selected, it populates the options for the subscript select-input
 * @param {string} tabId - the id of the tab-pane containing the input-card
 * @param {string} ioType - the type of input or output to add, it can be input for the setup or slider and chart for the dashboard
 */
function selectSubscript(tabId,ioType){
    let selectedName = $(`#${tabId} .${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsRanges = variables[selectedVars[0]].subs,
        adderGroup = $(`#${tabId} .${ioType}AdderDiv div.card-body`),
        subsGroup = adderGroup.find('.subsGroup').empty();
    if(subsRanges){
        subsRanges.forEach((range,i)=>{
            const label = $('<label>').addClass('input-group-text').html(range),
                select = $('<select>').addClass("custom-select subSelector");
            subscripts[range].elements.forEach((elmt)=>{
                const option = $('<option>').attr("value",elmt).html(elmt);
                select.append(option);
            });
            const labelDiv = $('<div>').addClass("input-group-prepend").append(label),
                inputGroup = $('<div>').addClass("input-group mb-3").append(labelDiv).append(select);
            subsGroup.append(inputGroup);
        });
    }
}

/**
 * reconstruct the variable (from name and suscripts) in form of string recognizable by the model
 * @param {string} iTab - the index of the tab addFunc is referring to
 * @param {string} ioType - the type of input/output element the var addition is referring to
 * @param {function object} addFunc - the addFunc to be performed with the selected var
 */
function addSelectedVar(iTab, ioType, addFunc){
    // if (!currentActiveTabs['tab'+iTab]) {return;}
    // if (currentActiveTab !== '#tab'+iTab ) {return;}
    const selectedName = $(`#pane${iTab} .${ioType}NameSelector`).children("option:selected").attr('value'),
        selectedVars = Object.keys(variables).filter(v => variables[v].name===selectedName),
        subsGroup = $(`#pane${iTab} .${ioType}AdderDiv .subsGroup`),
        selectedSubs = [];
    subsGroup.find('.subSelector').each(function(){
        selectedSubs.push($(this).children("option:selected").attr("value"));
    });
    let toAddVar = !selectedSubs.length ? selectedVars:
        selectedVars.filter( v => {
            const vSubs = v.split("[").slice(-1)[0].replace("]","").split(",");
            return selectedSubs.every(s=>vSubs.indexOf(s)>=0);
        });
    toAddVar.length>1?console.log("Error: the slider to add is not uniquely identified"):{};
    toAddVar = toAddVar[0];
    // console.log('Adding '+toAddVar);
    if (toAddVar){
        addFunc(iTab,ioType,toAddVar);
    }
}

