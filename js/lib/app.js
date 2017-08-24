angular.module('app', ['am.multiselect'])

.controller('formExample', ['$scope', function($scope){
    $scope.cars = [
                    {id:1, name: 'Audi'},
                    {id:2, name: 'BMW'},
                    {id:3, name: 'Honda'}
                ];
    $scope.selectedCar = [];
}]);
