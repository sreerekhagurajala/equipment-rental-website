'use strict';

angular.module('app.tagSearch', ['app.config'])
    .directive('tagSearch', function() {
        return {
            restrict: 'AEC',
            templateUrl: 'components/tagSearch/tagSearch.html',
            controller: function ($scope) {
                $scope.search = function(term) {

                }

            },

            link: function(scope, elem, attrs, http) {

            }
        };
    });
