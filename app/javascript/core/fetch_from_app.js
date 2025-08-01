//
//
// fetchFromApp:
//
//
// Usage example
// fetchFromApp('https://api.example.com/data')
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Fetch failed:', error));
//
// Options include:
//     fetchFromApp('xxx',{method:'GET',headers:JSON,csrf:true}).then(...)
//     method: 'GET' or 'POST'
//     headers: JSON object of headers to send
//     csrf: true to include CSRF token in headers
//     any other options supported by fetch()
//
//
//
export function csrfToken() {
  return document.querySelector('meta[name="csrf-token"]').content;
}

export async function fetchFromApp(url, options = {}, max_try_count = 3, delay = 500) {
  //
  // Update Headers to include JSON and CSRF Token
  //
  var headers = options.headers
  if(headers === undefined)
    headers = {}
  if(headers['Content-Type'] === undefined)
    headers['Content-Type'] = 'application/json';
  if(options.csrf){
    delete options.csrf;
    headers['X-CSRF-Token']=csrfToken();
  }
  options.headers = headers

  //
  // Fetch with retry
  //
  var retriable = true;
  for (let i = 0; i < max_try_count; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json(); // Successful response (return JSON)
        retriable = false;
        if(data.status === 'success'){
          return data;
        }
        console.error(`Error: [${data.status}] ${data.status_message}`);
        throw data.status_message;
      }
      if (response.status==404){
        retriable = false;
        console.error("Error: 404 Invalid URL");
        throw "Invalid.";
      }
      if (response.status==403){
        retriable = false;
        console.error("Error: 403 Forbidden");
        throw "Permission denied.";
      }
      if (response.status==500){
        retriable = false;
        console.error("Error: 500 Internal error");
        throw "Internal error.";
      }
      throw `Request failed with status ${response.status}`;
    } catch (error) {
      console.error(`Fetch failed: ${error}`);
      if(retriable){
        if (i < max_try_count - 1) {
          console.error(`Retry attempt ${i + 1} of ${max_try_count}...`);
          await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        } else {
          console.error(`Final attempt failed, rethrowing error...`);
          throw error; // Final attempt failed, rethrow error
        }
      }else{
        throw error; // Rethrow error
      }
    }
  }
}

// export function handleFetchError(error,setMessage=null) {
//   if(setMessage)
//     setMessage(error.toString());
// }

window.fetchFromApp = fetchFromApp;
