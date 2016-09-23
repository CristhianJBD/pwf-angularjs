/*
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios. 
 * Abarca las operaciones que pueden ser realizads sobre el recurso Persona.
 */
app.service('personaService', ['$http', function ($http) {
    return {
        /**
         * Realiza un get para obtener el json correspondeiente a la visualización
         * de anteproyecto.
         * @function
         */
        obtener: function (params) {
            return $http.get('http://localhost:1337/163.172.218.124/pwf/rest/agenda', {params: params})

        }
    }
}]);
