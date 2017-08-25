window.APIService = {};

window.APIService.get = function (route, done) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', window.Config.API.url + '/' + route);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = _onReadyStateChange(xhr, done);
    xhr.send();
};

window.APIService.getGoogleApiMap = function (route, done) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', route);

    xhr.onreadystatechange = _onReadyStateChange(xhr, done);
    xhr.send();
};

window.APIService.post = function (route, ObjectSend, done) {
    var xhr = new XMLHttpRequest();

    ObjectSend = JSON.stringify(ObjectSend);

    xhr.open('POST', window.Config.API.url + '/' + route);
    xhr.setRequestHeader('Content-Type', 'application/json');

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