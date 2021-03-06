'use strict';

angular.module('app.availability', ['app.config'])
    .directive('availability', function() {
        return {
            restrict: 'AEC',
            scope: {
                'datasource': '@'
                //'input': '@'
            },
            templateUrl: 'components/availability/availability.html',
            controller: function($scope, $http, $rootScope, $location, $attrs) {
                $scope.datasource =  $attrs.datasource;
                $scope.availability = "Loading...";
                $scope.$watch(
                    "datasource",
                    function handleFooChange( ) {
                        if ($attrs.datasource != "{{product.id}}") {
                            $scope.showdays = $attrs.showdays;
                            $scope.showLoading = false;
                            $scope.availabilityClass = {};
                            $http({
                                url: backend + '/p/' + $attrs.datasource + '/availability',
                                method: 'GET'
                            }).success(function(data) {
                                if (data.available) {
                                    $scope.availability = "Available";
                                    $scope.availabilityClass.color = "green";
                                } else {
                                    $scope.availability = "Unavailable";
                                }
                            }).
                            error(function() {
                                $scope.error = true;
                            });
                        } else {
                            $scope.showLoading = true;
                        }
                    }
                );




            },

            link: function(scope, elem, attrs, http) {

            }
        };
    });
