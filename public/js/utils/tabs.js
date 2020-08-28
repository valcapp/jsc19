currentActiveTab = ''

const addTab = (i,title)=>{
    const tabToAdd = createTab(i,title).insertBefore('.tabsBar .lastTab'),
        paneToAdd = createTabPane(i,title).appendTo('#tabContent');
    currentActiveTab = `#tab${i}`;
    
    $(document).ready(()=>{
        const tab = $(`#tab${i}`);
        tab.on('click',function(e){
            e.preventDefault();
            if (currentActiveTab === this.id){
                enableChangeTabName($(this));
            } else {
                currentActiveTab = this.id
            }
            $(this).tab('show');
        });

        //to ensure the var name select input displays the options
        enableInputCards(i);

        try {
            updateTabsObj(i,title);
        } catch(err) {
            console.log('Warning the tabs are not connected to any object, so new tabs will not work properly. Please, define a custom updateTabsObj()')
        }

        $(document).ready(()=>{
            $('li.lastTab .nav-link').removeClass('active');
        });
    });

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

// class activeTabsCount {
//     constructor(){
//         $('#setupTabs a.nav-link').each((i,tab)=>{
//             if(tab.id){
//                 this[tab.id]=false;
//             }
//         });
//     }
//     check(tabId){
//         Object.keys(this)
//             .filter( tab => !(tab === tabId))
//             .map( tab => this[tab]=false );
//         if (this[tabId] && editMode){
//             return true;
//         }else{
//             this[tabId]=true;
//             return false;
//         }
//     }
// }


const enableChangeTabName = (title)=>{
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
            changeTabName(title,newName);
            closeEditTabName();
        }
    });
    $(document).on('click', outTabListener);
};

const changeTabName = (title,newName)=> {
    const i = title.attr('id').replace("tab","");
    title.html(newName);
    $('#pane'+i).find('h4').html(newName);

    try {
        updateTabsObj(i,newName);
    } catch(err) {
        console.log('Warning the tabs are not connected to any object, so new tabs will not work properly. Please, define a custom updateTabsObj()')
    }

};

function activateNewTabAdder(){
    const lastTab = $('li.lastTab');
    lastTab.on('click',function(){
        $('.tab-pane.active').removeClass('active');
        const n = $('.tabsBar li').length - 1;
            newTabsN = $.map( $('.tabsBar a.nav-link'), el => $(el).text())
                .filter(x=>x.indexOf('New Tab ')>=0).length + 1;
        addTab(n,'New Tab '+newTabsN);
        $(document).ready(()=>{
            const tab = $(`#tab${n}`);
            tab.tab('show');
            tab.addClass('active')[0].click();
            tab[0].click();
        });
    });
}

const currentPane = ev => $(ev.target).closest(".tab-pane");

const toggleWithinPane = (ev,targetTag,hiddenType) =>{
    hiddenType = hiddenType.charAt(0)==="." ? hiddenType.slice(1) : hiddenType;
    currentPane(ev).find(targetTag).toggleClass(hiddenType);
}
