# cors-proxy-server

A proxy server to execute API call from UI without getting CORS error. This is the easiest way to bypass cors error. It supports all REST API calls. Options JSON accepts all the general axios options. 

# Sample fetch request
```javascript
function API_CALL() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Add your custom request options here  
  var raw = JSON.stringify({
    "options": {
      "url": "http://google.com",
      "method": "GET"
    }
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://html-cors-proxy.herokuapp.com/", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
```
