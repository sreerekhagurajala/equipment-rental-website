'use strict';

angular.module('app.limage', ['app.config'])
    .directive('limage', function () {
        return {
            restrict: 'AEC',
            scope: {
                width: '=',
                height: '=',
                image: '@',
                preview: '=',
                radius: '=',
                quality: '@',
                colour: '@'
            },
            templateUrl: 'components/image/image.html',
            controller: function ($scope, $colorThief) {
                var rgb;
                $scope.tap = function () {
                    var img = new Image();
                    img.onload = function () {
                        setTimeout(function () {
                            $scope.previewloaded = true;
                            $scope.imageStyles['background-image'] = 'url(\"' + $scope.url + '\")';
                            $scope.$apply();
                        }, 0);
                    };

                    if ($scope.tapped) {

                        $scope.previewClass = 'close';
                        setTimeout(function() {
                            $scope.tapped = false;
                            $scope.$apply()
                        }, 200)





                    } else {
                        $scope.tapped = true;
                        $scope.previewClass = 'open';

                        img.src = $scope.url;
                        if (img.complete) img.onload();
                    }

                };

                $scope.hoverstyle = {
                    'height': '100%',
                    'width': '100%',
                    'background': 'rgba(30, 30, 30, 0.4)',
                    'border-radius': $scope.radius + 'px',
                    'color': '#fff',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center'
                };

                $scope.previewStyle = {
                    'height': '100%',
                    'width': '100%',
                    'position': 'fixed',
                    'top': 0,
                    'left': 0,
                    'background-color': 'rgba(0, 0, 0, 0.2)',
                    'background-size': 'cover',
                    'z-index': 100,
                    'padding': '-20%'
                };
                $scope.imageStyles = {
                    'height': '100%',
                    'width': '100%',
                    'background': 'url("") no-repeat center center',
                    'background-size': 'contain'
                };

                $scope.imageStyle = {
                    'height': $scope.height + 'px',
                    'width': $scope.width + 'px',
                    'background': 'url("") no-repeat center center',
                    'background-size': 'cover',
                    'border-radius': $scope.radius + 'px'
                };
                $scope.$watch(
                    "image",
                    function handleFooChange() {
                        //console.log($scope.height)

                        if ($scope.image !== '{{product}}' && $scope.image !== 'undefined' && $scope.image !== '') {

                            $scope.data = JSON.parse($scope.image);
                            if ($scope.data.images !== undefined) {
                                $scope.data = $scope.data.images[0].size;
                            } else {
                                $scope.data = $scope.data.image[0].size;
                            }

                            $scope.url = domain + $scope.data.large;
                            
                            var url;
                            if ($scope.quality === 'small') {
                                url = domain + $scope.data.small;
                            } else if ($scope.quality === 'medium') {
                                url = domain + $scope.data.medium;
                            } else if ($scope.quality === 'large') {
                                url = domain + $scope.data.large;
                            } else {
                                url = domain + $scope.data.thumb;
                            }


                            // $scope.imageStyles.push('background-image': 'url(' + url + ')');
                            //console.log(url);
                            $scope.imageStyle['background-image'] = 'url(\"https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif\")';

                            var img = new Image();
                            img.crossOrigin = "Anonymous";
                            img.onload = function () {
                                setTimeout(function () {
                                    rgb = $colorThief.getColor(img);
                                    $scope.$emit('gotColour', $scope.index, rgb);
                                    $scope.colour = rgb;
                                    $scope.previewStyle['background-color'] =  'rgba(' + rgb + ', 0.9)',
                                    $scope.imageStyle['background-image'] = 'url(\"' + url + '\")';
                                    $scope.imageStyles['background-image'] = 'url(\"' + $scope.url + '\")';
                                    $scope.imageStyle.border = '3px solid rgb(' + rgb + ')';
                                    $scope.$apply();
                                }, 1);
                            };

                            img.src = url;
                            if (img.complete) img.onload();
                        }

                    }
                );


                $scope.hovering = function () {
                    $scope.hover = !$scope.hover;
                };
            },

            link: function (scope, elem, attrs, http) {


            }
        };
    });
