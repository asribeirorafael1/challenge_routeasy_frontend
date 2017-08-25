window.DeliveriesAddGetRemoveComponent = Vue.extend({
    ready: function () {
        this.getAll();
    },
    data: {
        DeliveriesAll: [],
        Object: {
            _id: '',
            nome_cliente:'',
            peso_em_kg: '',
            enderecoFull: '',
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
    template:
    '<main>' +
    '   <div class="outPopUp">'+
    '       <div class="flex-container bFlex" style="float: left; width: 300px;">'+
    '           <div class="flex-item">' +
    '               <form action="#">' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-cliente" v-model="Object.nome_cliente"/>' +
    '                       <label class="mdl-textfield__label" for="deliveries-nome-cliente">Nome Cliente</label>' +
    '                   </div>' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-peso" v-model="Object.peso_em_kg"/>' +
    '                       <label class="mdl-textfield__label" for="deliveries-peso">Peso da Entrega</label>' +
    '                   </div>' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-enderecofull" v-model="Object.enderecoFull"/>' +
    '                       <label class="mdl-textfield__label" for="deliveries-enderecofull">Endereço Cliente</label>' +
    '                   </div>' +
    '               </form>' +
    '           </div>' +
    '           <div>' +
    '               <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="search">Buscar</button>' +
    '           </div>' +
    '           <div>' +
    '               <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="add">Cadastrar Cliente</button>' +
    '           </div>' +
    '           <div>' +
    '               <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" v-on:click="remove">Resetar Cadastro</button>' +
    '           </div>' +
    '       </div>'+
    '       <div style="float: right">'+
    '           <div>'+
    '               Mapa'+
    '           </div>'+
    '           <div>'+
    '               Tabela'+
    '           </div>'+
    '       </div>'+
    '   </div>'+
    '</main>',
    methods: {
        add: function () {
            window.DeliveriesModel.add(this.Object, _onAddDeliveries);

            function _onAddDeliveries(Response) {
                if (!Response.status) {
                    return window.AlertService.error(Response.message);
                }

                var self = this;

                window.DeliveriesModel.getAll(_onGetAll);

                function _onGetAll(Response) {
                    if (!Response.status) {
                        window.AlertService.error(Response.message);
                        return false;
                    }

                    self.$set('DeliveriesAll', Response.Response);
                }
            }
        },
        search: function () {
            console.log("Endereço Completo:" + this.Object.enderecoFull);
        },
        getAll: function () {
            var self = this;

            window.DeliveriesModel.getAll(_onGetAll);

            function _onGetAll(Response) {
                if (!Response.status) {
                    window.AlertService.error(Response.message);
                    return false;
                }

                self.$set('DeliveriesAll', Response.Response);
            }
        },
        remove: function () {
            var self = this;

            window.DeliveriesModel.remove(_onRemove);

            function _onRemove(Response) {
                if (!Response.status) {
                    window.AlertService.error(Response.message);
                    return false;
                }

                self.$set('DeliveriesAll', Response.Response);
            }
        }
    }
});