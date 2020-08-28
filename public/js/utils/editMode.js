editMode = false;

function toggleEditMode(){
    $(".editMode").toggleClass("editModeHidden");
    editMode = editMode? false : true;
}