'use strict';

angular.module('nea.home.controller', [
    'nea.services.sampledata',
    'ngTable'


])

    .controller('CtrlHome', ['$scope', 'SampleDataService', 'NgTableParams',
        function ($scope, SampleDataService, NgTableParams) {

            console.log('CtrlHome');

            var vm = this;


            vm.tableParams = new NgTableParams({}, { dataset: vm.data});





            ///////////////////////////////////////
            var loadData = function(){

                SampleDataService.getSampleData()
                    .then(function (data) {
                        vm.data = data;
                    });

            };


            ///////////////////////////////////////
            function initHome(){
              loadData();
            }

            initHome();

        }])


;
