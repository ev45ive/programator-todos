export function xhr(type, url, data) {
    
    let xhr = new XMLHttpRequest();
        
    xhr.open(type, url);

    let p = new Promise(function(resolve, reject) {

        xhr.onload = function() {
            
            if(type == "GET" && xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else if (xhr.status === 200) {

                resolve();

            } else {
                reject( new Error("Wystąpił błąd") );
            }
        };

        xhr.onerror = function() {
            reject( new Error("Wystapił błąd") );
        };

    });

    if (data) {

        xhr.setRequestHeader("Content-type", "application/json")
        xhr.send(JSON.stringify(data));

    } else {
        xhr.send();
    }

    return p;
}