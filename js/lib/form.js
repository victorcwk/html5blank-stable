angular.module('formExample', ['am.multiselect'])

.controller('ExampleController', ['$scope', function($scope) {
    $scope.services = [
        {id: 1, service: 'Flight attendant (+$300)', price: 300},
        {id: 2, service: 'Full kitchen (+$100)', price: 100},
        {id: 3, service: 'massage (+$50)', price: 50},
        {id: 4, service: 'jacuzzi (+$180)', price: 180},
    ];
    $scope.user = {'baseFare': 0, 'additionalFare': 0, 'errorMsg': false, 'successMsg': false};
    $scope.requestJet = function(user) {
        $scope.user.errorMsg = '';
        $scope.user.successMsg = '';
        
        if (typeof user.pickUp === 'undefined') {
            $scope.user.errorMsg = 'Pick-Up is missing';
            return false;
        } else if (typeof user.dropOff === 'undefined') {
            $scope.user.errorMsg = 'Drop-off is missing';
            return false;
        } else if (typeof user.date === 'undefined') {
            $scope.user.errorMsg = 'Departure date is missing';
            return false;
        } else if (Date.parse(user.date) < Date.parse(new Date())) {
            // selected date is in the past
            $scope.user.errorMsg = 'Departure date is not available';
            return false;
        } else {
            $scope.user.errorMsg = false;
            $scope.user.successMsg = 'You have successfully booked a Jet (Base Fare: $' + user.baseFare + ') and will be arriving on ' + user.date + '. ';
            if (typeof user.selectedServices !== 'undefined') {
                $scope.user.successMsg += 'You have requested for additional services ' + user.selectedServices + '. ';
            }
            $scope.user.successMsg += 'Total amount is $' + (user.baseFare + user.additionalFare);
        }
    };

    $scope.selected = function(selectedServices) {
        $total = 0;
        for (i = 0; i < selectedServices.length; ++i) {
            for (j = 0; j < $scope.services.length; j ++) {
                if (selectedServices[i] == $scope.services[j].service) {
                    $total += $scope.services[j].price;
                }
            }
        }
        $scope.user.additionalFare = $total;
    };

    $scope.calBaseFare = function(user) {
        if (typeof user.pickUp != "undefined" && typeof user.dropOff != "undefined") {
            $scope.user.baseFare = 199;
        }
    }
}]);


$( function() {
    $( "#datepicker" ).datepicker();
} );