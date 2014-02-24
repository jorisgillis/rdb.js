'use strict';

var rdb = angular.module('rdb', ['ngResource', 'ngRoute']);

rdb.config(function($routeProvider) {
    // Recipe
    $routeProvider.when('/recipe/:recipeId', 
        {
            templateUrl: 'recipe.html',
            controller: 'RecipeController'
        });

    // Otherwise: go to index
    $routeProvider.otherwise({redirectoTo: '/'});
});

rdb.controller('rdbController', 
    ['$scope', 'Recipes',
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


