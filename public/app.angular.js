'use strict';

var rdb = angular.module('rdb', ['ngResource', 'ngRoute']);

rdb.config(function($routeProvider) {
    // Overview
    $routeProvider.
    when('/',
        {
            templateUrl: 'templates/overview.html',
        }).

    // Recipe
    when('/recipe/:recipeId', 
        {
            templateUrl: 'templates/recipe.html',
        }).

    // Otherwise: go to index
    otherwise({templateUrl: 'templates/overview.html'});
});

rdb.controller('overviewController', 
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

rdb.controller('recipeController',
    ['$scope', 'Recipes', 
        function($scope, Recipes) {
            var recipe = Recipes.recipe({recipeId: "1"}).$promise;
            recipe.then(function(result) {
                $scope.recipe = result.recipe;
            })
        }
    ]
);

rdb.factory('Recipes', 
    ['$resource', 
        function($resource) {
            return $resource('/api/recipe/:recipeId', 
                {},
                {
                    all: {method: 'GET'},
                    recipe: {method: 'GET', params: {recipeId: "1"}}
                });
        }
    ]
);


