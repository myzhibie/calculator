'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
