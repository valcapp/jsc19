$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sideBar').toggleClass('compressed');
        $('#contentDiv').toggleClass('compressed');
    });

});