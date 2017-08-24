var App = Vue.extend({});

window.router = new VueRouter();

window.router.map({
    '/front/deliveries': {
        component: window.DeliveriesAddGetRemoveComponent
    }
});

window.router.beforeEach(function (transition) {
    var path = transition.to.path;

    return window.router.go('/front/deliveries');

    transition.next();
});

window.router.start(App, '#app');