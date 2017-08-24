window.APIService = {};

window.APIService.get = function (route, done) {
    var xhr = new XMLHttpRequest();
    var token = window.LocalService.getString('token');

    xhr.open('GET', window.Config.API.url + '/' + route);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (token) {
        xhr.setRequestHeader('Authorization', token);
    }

    xhr.onreadystatechange = _onReadyStateChange(xhr, done);
    xhr.send();
};

window.APIService.post = function (route, ObjectSend, done) {
    var xhr = new XMLHttpRequest();
    var token = window.LocalService.getString('token');

    ObjectSend = JSON.stringify(ObjectSend);

    xhr.open('POST', window.Config.API.url + '/' + route);
    xhr.setRequestHeader('Content-Type', 'application/json');

    if (token) {
        xhr.setRequestHeader('Authorization', token);
    }

    xhr.onreadystatechange = _onReadyStateChange(xhr, done);
    xhr.send(ObjectSend);
};

function _onReadyStateChange(xhr, done) {
    return function () {
        if (xhr.readyState === 4) {
            var Response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                if (typeof done === 'function') {
                    return done(Response);
                }
            }
        }
    }
}