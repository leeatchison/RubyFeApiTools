import React from "react";
import {createRoot} from "react-dom/client";

//
// Register the app so we can use it with the data-setup-app attribute in an HTML div.
//
var appRegistry = {}
export function registerApp(name,Component){
    appRegistry[name] = Component;
}

//
// Install (render) all apps in the DOM
//
function installAppsInDom(){
    document.querySelectorAll('[data-setup-app]').forEach(element => {
        const appName = element.getAttribute('data-setup-app');
        const elementId = element.id;
        const optionStr = element.getAttribute('data-setup-options');
        const options = optionStr ? JSON.parse(optionStr) : {};

        // Check if the named function exists in global scope
        if (typeof appRegistry[appName] === 'function') {
            // Install/render the app at the div
            const root = createRoot(document.getElementById(elementId));
            const Component = appRegistry[appName];
            root.render(<Component {...options}/>);
            return root;

        } else {
            console.warn(`Setup function ${appName} not found for element #${elementId}, options=`,options,"");
        }
    });
}

function setup(){
    installAppsInDom();
}
export default {
    setup
};
