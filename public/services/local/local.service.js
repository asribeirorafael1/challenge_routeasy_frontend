window.LocalService = {};

window.LocalService.setString = function (key, value) {
    window.localStorage.setItem(window.Config.name + '-' + window.Config.environment + '-' + key, value);
};

window.LocalService.getString = function (key) {
    return window.localStorage.getItem(window.Config.name + '-' + window.Config.environment + '-' + key);
};

window.LocalService.setJSON = function (key, ValueJSON) {
    var value = JSON.stringify(ValueJSON);
    window.LocalService.setString(value);
};

window.LocalService.getJSON = function (key) {
    var value = window.LocalService.getString(key);
    return JSON.parse(value);
};