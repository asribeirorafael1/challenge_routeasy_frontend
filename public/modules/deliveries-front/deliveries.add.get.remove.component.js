window.DeliveriesAddGetRemoveComponent = Vue.extend({
    ready: function () {
        this.getAll();
    },
    data: {
        DeliveriesAll: {},
        enderecoFull: '',
        GeoInfoObject: {},
        ObjectO: {
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
    template:
    '<main>' +
    '   <div class="outPopUp">'+
    '       <div class="flex-container bFlex" style="float: left; width: 300px;">'+
    '           <div class="flex-item">' +
    '               <form action="#">' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-cliente" v-model="ObjectO.nome_cliente"/>' +
    '                       <label class="mdl-textfield__label" for="deliveries-nome-cliente">Nome Cliente</label>' +
    '                   </div>' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-peso" v-model="ObjectO.peso_em_kg"/>' +
    '                       <label class="mdl-textfield__label" for="deliveries-peso">Peso da Entrega</label>' +
    '                   </div>' +
    '                   <div class="mdl-textfield mdl-js-textfield">' +
    '                       <input class="mdl-textfield__input" type="text" id="deliveries-enderecofull" v-model="enderecoFull"/>' +
    '                       <label class="mdl-textfield__label" for="enderecofull">Endereço Cliente</label>' +
    '                   </div>' +
    '               </form>' +
    '           </div>' +
    '           <div>' +
    '               <span>Longitude: {{ObjectO.endereco.geolocalizacao.lng}}</span>' +
    '               <span>Latitude: {{ObjectO.endereco.geolocalizacao.lng}}</span>' +
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
    '       <div>'+
    '           <div id="mapid">'+
    '           </div>'+
    '           <div>'+
    '               <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">' +
    '                   <thead>' +
    '                       <tr>' +
    '                           <th class="mdl-data-table__cell--non-numeric">Nome</th>' +
    '                           <th class="mdl-data-table__cell--non-numeric">Rua</th>' +
    '                           <th class="mdl-data-table__cell--non-numeric">Cidade</th>' +
    '	                        <th class="mdl-data-table__cell--non-numeric">País</th>' +
    '	                        <th>Peso</th>' +
    '	                        <th>Lat</th>' +
    '	                        <th>Lng</th>' +
    '                       </tr>' +
    '                   </thead>' +
    '                   <tbody>' +
    '                       <tr v-for="Delivery in DeliveriesAll">' +
    '                           <td class="mdl-data-table__cell--non-numeric">{{Delivery.nome_cliente}}</td>' +
    '	                        <td class="mdl-data-table__cell--non-numeric">{{Delivery.endereco.logradouro}}</td>' +
    '	                        <td class="mdl-data-table__cell--non-numeric">{{Delivery.endereco.cidade}}</td>' +
    '	                        <td class="mdl-data-table__cell--non-numeric">{{Delivery.endereco.pais}}</td>' +
    '	                        <td>{{Delivery.peso_em_kg}}</td>' +
    '                           <td>{{Delivery.endereco.geolocalizacao.lat}}</td>' +
    '	                        <td>{{Delivery.endereco.geolocalizacao.lng}}</td>' +
    '                       </tr>    ' +
    '                   </tbody>' +
    '               </table>' +
    '           </div>'+
    '       </div>'+
    '   </div>'+
    '</main>',
    methods: {
        add: function () {
            var self = this;

            window.DeliveriesModel.add(this.ObjectO, _onAddDeliveries);

            function _onAddDeliveries(Response) {
                if (!Response.status) {
                    // toastr.error("Erro", "Entrega não cadastrada - Verifique as informações");
                    return false;
                    // return window.AlertService.error(Response.message);
                }

                // toastr.success("Sucesso", "Entrega cadastrada com sucesso.");

                self.$set('GeoInfoObject', {});
                self.$set('ObjectO', {
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
                });
                self.$set('enderecoFull', '');

                window.DeliveriesModel.getAll(_onGetAll);

                function _onGetAll(Response) {
                    if (!Response.status) {
                        window.AlertService.error(Response.message);
                        return false;
                    }

                    self.$set('DeliveriesAll', Response.Response);

                    var mymap = L.map('mapid').setView([-23.533773, -46.625290], 13);

                    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXNyaWJlaXJvcmFmYWVsIiwiYSI6ImNqNnJkZnl3ZDA3aW4ycXBicHgwYTBkdDEifQ.RglsYACL2vfRhqifEOhkUw', {
                        maxZoom: 18,
                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                        id: 'mapbox.streets'
                    }).addTo(mymap);

                    var Deliveries = Response.Response;

                    for (var i = 0; i < Deliveries.length; i++) {
                        var marker = L.marker([Deliveries[i].endereco.geolocalizacao.lat, Deliveries[i].endereco.geolocalizacao.lng]).addTo(mymap);
                        marker.bindPopup("<b>"+Deliveries[i].nome_cliente+"</b><br>"+Deliveries[i].peso_em_kg+"kg").openPopup();
                    }
                }
            }
        },
        search: function () {
            var self = this;

            window.DeliveriesModel.getGeoInfo(this.enderecoFull, _onGetGeoInfo);

            function _onGetGeoInfo(Response) {
                if (!Response.status) {
                    // toastr.error("Erro", "Endereço não encontrado, favor verificar as informações digitadas.");
                    return false;
                }

                // toastr.success("Sucesso", "Endereço encontrado e carregado Latitude e Longitude.");

                var GeoInfoObject = Response.results[0];

                self.$set('GeoInfoObject', JSON.stringify(Response.results[0]));
                self.$set('ObjectO.endereco.logradouro', GeoInfoObject.address_components[1].long_name);
                self.$set('ObjectO.endereco.numero', GeoInfoObject.address_components[0].long_name);
                self.$set('ObjectO.endereco.bairro', GeoInfoObject.address_components[2].long_name);
                self.$set('ObjectO.endereco.complemento', GeoInfoObject.formatted_address);
                self.$set('ObjectO.endereco.cidade', GeoInfoObject.address_components[4].long_name);
                self.$set('ObjectO.endereco.estado', GeoInfoObject.address_components[5].long_name);
                self.$set('ObjectO.endereco.pais', GeoInfoObject.address_components[6].long_name);
                self.$set('ObjectO.endereco.geolocalizacao.lng', GeoInfoObject.geometry.location.lng);
                self.$set('ObjectO.endereco.geolocalizacao.lat', GeoInfoObject.geometry.location.lat);
            }
        },
        getAll: function () {
            var self = this;

            window.DeliveriesModel.getAll(_onGetAll);

            function _onGetAll(Response) {
                if (!Response.status) {
                    // toastr.error("Erro", "Ocorreu um erro e as entregas não puderam ser retornadas.");
                    return false;
                }

                self.$set('DeliveriesAll', Response.Response);

                var mymap = L.map('mapid').setView([-23.533773, -46.625290], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXNyaWJlaXJvcmFmYWVsIiwiYSI6ImNqNnJkZnl3ZDA3aW4ycXBicHgwYTBkdDEifQ.RglsYACL2vfRhqifEOhkUw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);

                var Deliveries = Response.Response;

                for (var i = 0; i < Deliveries.length; i++) {
                    var marker = L.marker([Deliveries[i].endereco.geolocalizacao.lat, Deliveries[i].endereco.geolocalizacao.lng]).addTo(mymap);
                    marker.bindPopup("<b>"+Deliveries[i].nome_cliente+"</b><br>"+Deliveries[i].peso_em_kg+"kg").openPopup();
                }
            }
        },
        remove: function () {
            var self = this;

            window.DeliveriesModel.remove(_onRemove);

            function _onRemove(Response) {
                if (!Response.status) {
                    // toastr.error("Erro", "Ocorreu um erro ao remover todas as entregas.");
                    return false;
                }

                // toastr.success("Sucesso", "Entregas removidas com sucesso.");

                self.$set('DeliveriesAll', Response.Response);

                var mymap = L.map('mapid').setView([-23.533773, -46.625290], 13);

                L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYXNyaWJlaXJvcmFmYWVsIiwiYSI6ImNqNnJkZnl3ZDA3aW4ycXBicHgwYTBkdDEifQ.RglsYACL2vfRhqifEOhkUw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    id: 'mapbox.streets'
                }).addTo(mymap);

                var Deliveries = Response.Response;

                for (var i = 0; i < Deliveries.length; i++) {
                    var marker = L.marker([Deliveries[i].endereco.geolocalizacao.lat, Deliveries[i].endereco.geolocalizacao.lng]).addTo(mymap);
                    marker.bindPopup("<b>"+Deliveries[i].nome_cliente+"</b><br>"+Deliveries[i].peso_em_kg+"kg").openPopup();
                }
            }
        }
    }
});