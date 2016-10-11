/**
 * Enrutador de la aplicación
 */
var app = angular.module('pwfApp', ['ngRoute', 'ui.bootstrap']);
// configure our routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/lista-persona-partial.html',
            controller: 'listaPersonaCtrl'
        })
        .when('/agenda/agregar', {
            templateUrl: 'views/formulario-persona-partial.html',
            controller: 'formularioPersonaCtrl'
        })
        .when('/agenda/editar/:id',{
            templateUrl:'views/editar-persona.html',
            controller :'listaPersonaCtrl'
        })
        .when('/agenda/ver/:id',{
            templateUrl:'views/ver-persona.html',
            controller :'listaPersonaCtrl'
        });
});

/**
 * Variable compartida entre los controladores. se utiliza para añadir
 * elementos a la lista de personas.
 */
app.factory('Shared', function () {
    return {
        list: []
    };
});
