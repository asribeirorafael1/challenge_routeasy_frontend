var App = Vue.extend({});

window.router = new VueRouter();

window.router.map({
    '/': {
        component: window.DeliveriesAddGetRemoveComponent
    }
});

window.router.start(App, '#app');