'use strict';

var rdb = angular.module('rdb', ['ngResource']);

rdb.controller('rdbController', 
    ['$scope', 'Recipes',
        function($scope, Recipes) {
            Recipes.all(function(recipes) {
                $scope.recipes = recipes;       
            });
        }
    ]
);

rdb.factory('Recipes', 
    ['$resource', 
        function($resource) {
            return $resource('/recipe/:recipeId', {},
                {
                    all: {method: 'GET'}
                });
        }
    ]
);


