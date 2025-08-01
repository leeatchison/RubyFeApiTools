var server_config_data_hash = {}
export function getServerData(name){
    return server_config_data_hash[name];
}

export function getDataAttributes(element){
    const elementObj = document.getElementById(element);
    if (!elementObj) return {};
    return Object.fromEntries(
        Object.entries(elementObj.dataset).map(([key, value]) => {
            // Try to parse the value as JSON in case it's a boolean/number/object
            try {
                return [key, JSON.parse(value)];
            } catch {
                // If it's not valid JSON, keep it as a string
                return [key, value];
            }
        })
    );
}

function setup(){
    server_config_data_hash = getDataAttributes('config');
}

export default {
    setup
};
