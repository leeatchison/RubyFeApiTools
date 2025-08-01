//
//
// Menus
//
//
var closableMenus = []
function popupMenu(menu_str,label_str,vMenu,vLabel,hMenu,hLabel){

    // Info on menu label
    const label = document.querySelector(label_str);
    const labelPosition = label.getBoundingClientRect(); // Get position and size of `label`
    const labelHeight = Math.round(labelPosition.height); // Get the height of `label`
    const labelWidth = Math.round(labelPosition.width); // Get the width of `label`

    // Info on dropdown menu
    const menu = document.querySelector(menu_str);
    menu.style.display='block';
    const menuPosition = menu.getBoundingClientRect(); // Get position and size of `label`
    const menuHeight = menuPosition.height; // Get the height of `menu`
    const menuWidth = menuPosition.width; // Get the width of `menu`

    // Calculate the top and left positions
    const topPos = labelPosition.top + window.scrollY + (labelHeight * vLabel) + (menuHeight * vMenu);
    const leftPos = labelPosition.left + window.scrollX + (labelWidth * hLabel) + (menuWidth * hMenu);

    // Set the calculated position to `menu`
    menu.style.top = `${topPos}px`; // Set top position
    menu.style.left = `${leftPos}px`; // Set left position

}
function closeMenu(menu_str){
    const menu = document.querySelector(menu_str);
    menu.style.position = "absolute";
    menu.style.top = '0px';
    menu.style.left = '0px';
    menu.style.display='none';
}
function registerPopupMenu(menu,clicker,vMenu,vLabel,hMenu,hLabel,click_to_parent){
    document.querySelector(clicker).addEventListener('click', function(event) {
        closeAllMenus();
        popupMenu(menu,clicker,vMenu,vLabel,hMenu,hLabel);
        if(!click_to_parent){
            event.stopPropagation();
        }
    });
    closableMenus.push(menu);
}
function closeAllMenus(){
    var idx;
    for (idx in closableMenus){
        closeMenu(closableMenus[idx]);
    }
}
document.querySelector('body').addEventListener('click', function() {
    closeAllMenus();
});

//
// Exports (Global Namespace)
//
window.registerPopupMenu = registerPopupMenu;
