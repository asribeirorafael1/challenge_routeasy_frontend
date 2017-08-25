window.DeliveriesAddGetRemoveComponent = Vue.extend({
    data: {
        Object: {
            _id: '',
            nome_cliente:'',
            peso_em_kg: '',
            endereco: {
                logradouro: '',
                numero: '',
                bairro: '',
                complemento: '',
                cidade: '',
                estado: '',
                pais: '',
                geolocalizacao: {
                    lng: 0,
                    lat: 0
                }
            }
        }
    },
    template: '<div class="mdl-layout mdl-js-layout mdl-color--grey-100">' +
    '    <main class="mdl-layout__content">' +
    '        <div class="mdl-card mdl-shadow--6dp">' +
    '            <div class="mdl-card__title mdl-color--primary mdl-color-text--white">' +

    '               <h2 class="mdl-card__title-text">Challenge RoutEasy</h2>' +

    '               <button id="demo-menu-lower-right"' +
    '                   class="mdl-button mdl-js-button mdl-button--icon">' +
    '                       <i class="material-icons">more_vert</i>' +
    '               </button>' +

    '               <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"' +
    '                   for="demo-menu-lower-right">' +
    '                   <li class="mdl-menu__item" v-on:click="logout">Sair</li>' +
    '               </ul>' +

    '            </div>' +
    '            <div class="mdl-card__supporting-text">' +
    '                <form action="#">' +
    '                    <div class="mdl-textfield mdl-js-textfield">' +
    '                        <input class="mdl-textfield__input" type="text" id="real-state-name" v-model="Object.name"/>' +
    '                        <label class="mdl-textfield__label" for="real-state-name">Nome</label>' +
    '                    </div>' +
    '                    <div class="mdl-textfield mdl-js-textfield">' +
    '                        <input class="mdl-textfield__input" type="text" id="real-state-description" v-model="Object.description"/>' +
    '                        <label class="mdl-textfield__label" for="real-state-description">Descrição</label>' +
    '                    </div>' +
    '                </form>' +
    '            </div>' +
    '            <div class="mdl-card__actions mdl-card--border">' +
    '                <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="add">Cadastrar</button>' +
    '            </div>' +
    '        </div>' +
    '    </main>' +
    '</div>',
    methods: {
        add: function () {
            window.DeliveriesModel.add(this.Object, _onAddDeliveries);

            function _onAddDeliveries(Response) {
                if (!Response.status) {
                    return window.AlertService.error(Response.message);
                }

                alert('\\o/');
            }
        },
        getAll: function () {
            var self = this;

            window.DeliveriesModel.getAll(_onGetAll);

            function _onGetAll(Response) {
                if (!Response.status) {
                    window.AlertService.error(Response.message);
                    return false;
                }

                self.$set('Deliveries', Response.Response);
            }
        },
        remove: function () {
            var self = this;

            window.DeliveriesModel.remove(this.Object._id, _onRemove);

            function _onRemove(Response) {
                if (!Response.status) {
                    window.AlertService.error(Response.message);
                    return false;
                }

                self.$set('Deliveries', Response.Response);
            }
        }
    }
});