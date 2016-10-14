/**
 * Clase encargada de manejar el listado de personas.
 * @class
 */
        app.controller('formularioPersonaCtrl', ['$scope', 'Shared', '$http',
            function ($scope, Shared,$http) {
                var url = 'https://desa03.konecta.com.py/pwf/rest/agenda';

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

            if($scope.persona.nombre == undefined){
                alert('Debe ingresar el Nombre del nuevo Contacto');
                return false;
            }
            else if($scope.persona.apellido == undefined) {
                alert('Debe ingresar el Apellido del nuevo Contacto');
                return false;
            }
            else if($scope.persona.alias == undefined){
                alert('Debe ingresar el Alias del nuevo Contacto');
                return false;
            }
            else if($scope.persona.telefono == undefined){
                alert('Debe ingresar el numero de Telefono del nuevo Contacto');
                return false;
            }
            else if($scope.persona.email == undefined) {
                alert('Debe ingresar el Email del nuevo Contacto');
                return false;
            }
            else if($scope.persona.direccion == undefined){
                alert('Debe ingresar la Direccion del nuevo Contacto');
                return false;
            }
            else if (regEmail.test($scope.persona.email) == false) {
                alert('El Email ingresado no es válido');
                return false;
            }
            else if(regTelefono.test($scope.persona.telefono) == false){
                alert('El numero de telefono ingresado no es válido');
                return false;
            }
            else {
                $http.post(url,$scope.persona)
                    .success(function (response) {
                        $scope.data.list.push(angular.copy(response));
                        window.alert("El contacto se ha guardado correctamente");
                        $scope.persona = {};
                    })
                    .error(function (error) {
                        window.alert("El contacto no se guardo correctamente")
                    })
            }
        };



        

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

        };
    }
 ]);
