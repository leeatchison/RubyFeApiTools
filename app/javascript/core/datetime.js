//
//
// Display date/time in local timezone
//
//
export function datetimeToLocalDateTime(datetime){
    return datetime.toLocaleString('en-US',{
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
export function datetimeToLocalDate(datetime){
    return datetime.toLocaleString('en-US',{
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
}
export function datetimeToLocalTime(datetime){
    return datetime.toLocaleString('en-US',{
        hour: '2-digit',
        minute: '2-digit'
    });
}

//
//
// Convert special HTML formatting into a local datetime (can convert a server datetime into browser-local).
//
// Call like this:
//
//     <span data-iso-date="#{serverTime}">Loading...</span>
//
// Make sure you put this in application.js:
//
//     import BrowserLocalDateTime from '@commoncore/browser_local_datetime.js';
//     BrowserLocalDateTime.setup();
//
//
function updateAllDates(){
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    console.log("Updating all dates...");

    document.querySelectorAll('span[data-iso-date]').forEach(span => {
        console.log("Updating date:",span);
        const isoDate = span.dataset.isoDate;
        span.textContent = formatter.format(new Date(isoDate));
    });
}

function setup(){
    console.log("Setting up datetime...");
    updateAllDates();
}

export default {
    setup
};
