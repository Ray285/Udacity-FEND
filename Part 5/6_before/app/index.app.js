(function(){
    'use strict';

    console.log("Hello World from app.js");

    const ENDPOINT = 'http://ec2-54-197-18-215.compute-1.amazonaws.com/DemoProject/api';
    var app = angular.module('app',[]);

    app.controller('MasterToolController', function($http){
        var vm = this;        //a good practice in case the object this is used in another scope
        //http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/

        vm.title = 'Master Tool List' ;
        vm.masterTools = [];

        vm.loadMasterTools = function () {
            console.log('Start loading data form json file.');

            $http.get(ENDPOINT + '/MasterTools.php')
            .then(
                function successCb(response) {
                    console.log('Success!');
                    vm.masterTools = response.data;
                },
                function errorCb(response) {
                    console.log('Failure! '+ ENDPOINT + ' returned error:' + response.data);
                }
            )
        };

        vm.loadMasterTools();

        vm.newMasterTool = {
            id: '',
            name: '',
            description: '',
            price: null,
            weight: null
        };

        vm.AddMasterTool = function() {
            console.log('New Product: ' + vm.newMasterToolId + "-" + vm.newMasterToolName);

            // vm.masterTools.push( vm.newMasterTool );

            $http.post(ENDPOINT + '/MasterTool/create.php',
                JSON.stringify(vm.newMasterTool)
            ).then (
                function successCb (response) {
                    vm.loadMasterTools();
                },
                function failureCb (response) {
                    console.log('ENDPOINT' + ENDPOINT + ' returned error: ' + response.data);
                }
            );

			//refresh the model
            vm.newMasterTool = {
                id: '',
                name: '',
                description: '',
                price: null,
                weight: null
            };
        };

        vm.deleteMasterToolId = null;

        vm.DeleteMasterTool = function () {

                if (vm.deleteMasterToolId) {

                    var selectedMasterTool = {
                        id: vm.deleteMasterToolId
                    };

                    $http.post(
                            ENDPOINT + '/MasterTool/delete.php',
                            JSON.stringify(selectedMasterTool)
                    ).then(
                        function successCb (response) {
                            vm.loadMasterTools();
                        },
                        function failureCb (response) {
                            console.log('ENDPOINT ' + ENDPOINT + ' returned error: ' + response.data);
                        }
                    );
                    vm.deleteMasterTool = null;
                }
        };
    });
})();
