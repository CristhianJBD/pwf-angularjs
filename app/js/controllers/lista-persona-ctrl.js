/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('listaPersonaCtrl', ['$scope', 'personaService', 'Shared', '$http' , '$rootScope',

    function ($scope, personaService, Shared, $http, $rootScope) {
        var url = 'https://desa03.konecta.com.py/pwf/rest/agenda';
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = Shared;
        $scope.persona = $rootScope.persona;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize=5;
        $scope.atributo = "";



        /**
         * Se encarga de obtener los datos de la visualización.
         * @function
         * @private
         */
        function getData() {
            personaService.obtener()
                .success(function (data) {
                    $scope.data.list = data.lista;
                }).error(function (data, code) {
                    alert("Error al obtener las personas");
                });
        }

        $scope.editarContacto = function (item) {
            $scope.persona = angular.copy(item);
            $rootScope.persona = $scope.persona;
            window.open("#agenda/editar/"+item.id, '_self',false);
        };
        
        $scope.actualizarContacto = function (item) {
           $http.put(url + '/' + item.id, item)
                .success(function (response) {
                    getContactos();
                    window.alert("El contacto ha sido modificado correctamente");
                    window.open("#/",'_self', false);
                })
                .error(function (error) {
                    window.alert("El contacto no se ha podido modificar")
                })
        };

        $scope.cancelar = function () {
            window.open("#/",'_self', false);
        };

        $scope.borrarContacto = function (item) {
            var opcion = window.confirm("Si borra el contacto ya no se podrá recuperar. Desea borrar el contacto?");

            if(opcion == true) {
                $http.delete(url + '/' + item.id)
                    .success(function () {
                        getContactos();
                        window.alert("El contacto ha sido eliminado correctamente");
                        window.open("#/", '_self', false);
                    })
                    .error(function () {
                        window.alert("El contacto no se ha podido eliminar");
                    });
            }else {return false;}
        };


        $scope.verContacto = function (item) {
            $http.get(url + '/' + item.id)
            .success(function (response) {
                $scope.persona = angular.copy(response);
                $rootScope.persona = $scope.persona;
                window.open("#agenda/ver/"+item.id, '_self',false);

            })
            .error(function () {
                window.alert("No se ha podido obtener el contacto");
            });
        };


        function getContactos() {

            var posicion = ($scope.currentPage-1)*10;

            $http.get(url + "?inicio="+ posicion + "&cantidad="+ $scope.numPerPage +"&filtro=" + $scope.atributo )
                .success(function (data) {
                    $scope.data.list = data.lista;
                    $scope.total=data.total;

                }).error(function (data, code) {
                alert("Error al tratar de obtener los contactos");
            });
        }


        $scope.buscarContactos = function () {
            getContactos();
        };


        $scope.limpiarCriterios = function () {
            $scope.atributo = "";
            getContactos();

        };

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {

                getContactos();

        })();
    }
]);
