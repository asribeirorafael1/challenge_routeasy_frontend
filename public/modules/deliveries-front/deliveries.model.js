window.DeliveriesModel = {};

window.DeliveriesModel.getAll = function (done) {
    window.APIService.get('deliveries/getall', done);
};

window.DeliveriesModel.add = function (NewDeliveries, done) {
    window.APIService.post('deliveries/add', NewDeliveries, done);
};

window.DeliveriesModel.remove = function (deliveriesId, done) {
    window.APIService.get('deliveries/remove/' + deliveriesId, done);
};