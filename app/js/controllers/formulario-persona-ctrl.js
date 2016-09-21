/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
var contador = 0;
app.controller('formularioPersonaCtrl', ['$scope', 'Shared',
    function ($scope, Shared) {


        /**
         * Array que contiene los datos de la lista
         * @type Array
         * @field
         */
        $scope.data = Shared;
        $scope.persona = {};
        /**
         * Se encarga de agregar datos a la lista
         * @function
         */
        $scope.agregar = function (params) {
            var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var regTelefono = /^[0-9]*$/ ;
            if (regEmail.test($scope.persona.email) == false) {
                alert('El Email ingresado no es válido');
                return false;
            }else if(regTelefono.test($scope.persona.telefono) == false){
                alert('El numero de telefono ingresado no es válido');
                return false;
            } else {
                contador = contador + 1;
                $scope.persona.id = contador;
                $scope.persona.fechacreacion = new Date();
                $scope.data.list.push(angular.copy($scope.persona));
                $scope.persona = {};
                    window.alert("El contacto se ha guardado correctamente");
            }

        }

        $scope.solonumeros = function (e) {

            key = e.keyCode || e.which;
            teclado=String.fromCharCode(key);
            numeros = "0123456789";
            especiales="8 -37-38-46";
            teclado_especial=false;
            for(var i in especiales){
                if(key == especiales[i]){
                    teclado_especial=true;
                }
            }
            if(numeros.indexOf(teclado)==-1 && !teclado_especial){
                return false;
            }

        }
    }
 ]);
