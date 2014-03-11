'use strict';

var rdb = angular.module('rdb', ['ngResource', 'ngRoute', 'wu.masonry']);

rdb.config(function($routeProvider) {
    // Overview
    $routeProvider.
    when("/",
        {
            templateUrl: "/templates/overview.html",
            controller: "overviewController"
        }).

    // Recipe
    when("/recipe/:recipeId", 
        {
            templateUrl: "/templates/recipe.html",
            controller: "recipeController"
        }).

    // Adding a recipe
    when("/addrecipe",
        {
            templateUrl: "/templates/addrecipe.html",
            controller: "addRecipeController"
        }).

    // Otherwise: go to index
    otherwise({redirectTo: '/'});
});

rdb.controller('overviewController', 
    ['$scope', 'Recipes', '$route',
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
    ['$scope', 'Recipes', '$routeParams',
        function($scope, Recipes, $routeParams) {
            var recipe = Recipes.recipe({recipeId: $routeParams.recipeId}).$promise;
            recipe.then(function(result) {
                $scope.recipe = result.recipe;
                $scope.ingredientList = result.ingredientList;
            })
        }
    ]
);


rdb.controller('addRecipeController', 
    ['$scope', 
        function($scope) {

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
                    recipe: {method: 'GET', params: {recipeId: "1"}},
                    save: {method: 'PUT'}
                });
        }
    ]
);


