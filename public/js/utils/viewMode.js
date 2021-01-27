const hideCustomizingButtons = ()=>{
    document.querySelectorAll('.editSiteButton, .designerMode, .customizeButton').forEach(el=>el.classList.add('hidden'))
}

viewMode && hideCustomizingButtons()

