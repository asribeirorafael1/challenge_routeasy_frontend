window.AlertService = {};

window.AlertService.error = function (message) {
    var alertModal = document.querySelector('#alert-modal');
    var data = {
        message: message,
        timeout: 4000
    };

    alertModal.MaterialSnackbar.showSnackbar(data);
};