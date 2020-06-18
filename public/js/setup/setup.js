// get a json object of the setupsTabs:
// {tabName:{input:{question, modelVar}}}

// load the tabs specified in the object

$(document).ready(function(){
    $('#setupTabs li').not('.lastTab').each((i,tab)=>allowTabNameChange($(tab)));
    activateNewTabAdder();
});

function activateNewTabAdder(){
    const lastTab = $('li.lastTab');
    lastTab.on('click',function(){
        const n = $('#setupTabs li').length,
            newTab = $('<li class="nav-item">'),
            newTabTitle = $('<a class="nav-link" data-toggle="tab" role="tab" >')
                .attr('id','tab'+n)
                .attr('href','#pane'+n)
                .html('Tab '+n)
                .appendTo(newTab),
            newTabInput = $(`<input type="text" name="nameTab${n}" id="#nameTab${n}" class="hidden nav-link" value="${newTabTitle.html()}">`)
                .appendTo(newTab);
            newTabPane = $(`<div class="tab-pane fade" id="pane${n}" role="tabpanel">`)
                .append('<br>').append($("<h4>").html(newTabTitle.html()))
                .appendTo($("#TabContent"));
            
        $('#setupTabs .lastTab').before(newTab);
        allowTabNameChange(newTab);
        $(document).ready(()=>{
            newTab[0].click();
            $(document).ready(()=>{
                newTabTitle.addClass('active')[0].click();
            });
        });
    });
}

const allowTabNameChange = tab =>{
    tab.on('click', (ev) => {
        const clickedTitle = $(ev.target);
        if (clickedTitle.hasClass('active')){
            changeTabName(clickedTitle);
        }
    });
    $(document).ready(()=>{
        $('li.lastTab .nav-link').removeClass('active');
    }); 
};

const changeTabName = (title)=>{
    title.addClass('hidden');
    const tab = title.parents('li');
    const input = tab.find('input').removeClass('hidden').focus().select();
    const outTabListener = ev => {               
        if (!$(ev.target).closest(tab).length) {
            closeEditTabName();
        }
    };
    const closeEditTabName = () =>{
        $(document).off('click', outTabListener);
        title.removeClass('hidden');
        input.addClass('hidden');
    };

    input.on('keyup',(ev)=>{
        const keyCode = ev.which;
        // console.log(ev.which,ev.key);
        if (keyCode === 27){
            closeEditTabName();
        } else if (keyCode === 13){
            let newName = input.val().trim();
            newName = newName===''?
                "Tab " + title.attr('name').replace("nameTab",""):
                newName;
            title.html(newName);
            const i = title.attr('id').replace("tab","");
            $('#pane'+i).find('h4').html(newName);
            closeEditTabName();
        }
    });

    $(document).on('click', outTabListener);

};



