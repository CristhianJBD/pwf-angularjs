/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
app.controller('listaPersonaCtrl', ['$scope', 'personaService', 'Shared',

    function ($scope, personaService, Shared) {
        /**
         * Array que contiene los datos de la visualización
         * @type Array
         * @field
         */
        $scope.data = Shared;

        /**
         * Se encarga de obtener los datos de la visualización.
         * @function
         * @private
         */
        function getData(params) {
            personaService.obtener(params)
                .success(function (data) {
                    $scope.data.list = data.lista;
                    $scope.data.total=data.total;
                    console.log($scope.data.list[0])
                    console.log($scope.data.total)
                }).error(function (data, code) {
                    alert("Error al obtener las personas");
                });
        }


        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            //se realiza el get solo si no hay datos
            if ($scope.data.list.length == 0) {
                getData();
            }
        })();
    }
]);
