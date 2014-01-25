'use strict';

var rdb = angular.module('rdb', ['ngResource', 'ngRoute']);

rdb.controller('rdbController', 
    ['$scope', '$routeProvider', 'Recipes',
        function($scope, Recipes) {
            var allRecipes = Recipes.all().$promise;
            allRecipes.then(
                function(result) {
                    $scope.recipes = result.recipes;
                });
        }
    ]
);

rdb.factory('Recipes', 
    ['$resource', 
        function($resource) {
            return $resource('/recipe/:recipeId', 
                {},
                {
                    all: {method: 'GET'}
                });
        }
    ]
);


