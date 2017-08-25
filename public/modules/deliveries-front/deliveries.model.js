window.DeliveriesModel = {};

window.DeliveriesModel.getAll = function (done) {
    window.APIService.get('deliveries/getall', done);
};

window.DeliveriesModel.add = function (NewDeliveries, done) {
    window.APIService.post('deliveries/add', NewDeliveries, done);
};

window.DeliveriesModel.remove = function (done) {
    window.APIService.get('deliveries/remove', done);
};

window.DeliveriesModel.getGeoInfo = function (locationReference, done) {
    window.APIService.getGoogleApiMap('https://maps.googleapis.com/maps/api/geocode/json?address='+locationReference+'&key=AIzaSyCh4miP9c8FHk-lO6oyi-1zhD1ktDOBick', done);
};