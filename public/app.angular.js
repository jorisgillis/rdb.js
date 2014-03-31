'use strict';

require.config(
    paths: {
        'ng': '/bower_components/ng-amd/src/ng',
        'ng-module': '/bower_components/ng-amd/src/ng-module'
    }
);

require([], function() {
    var rdb = angular.module('rdb', ['ngResource', 'ngRoute', 'wu.masonry', 'localytics.directives']);

    //---- ROUTING
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

    //--- CONTROLLERS
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
        ['$scope', 'Ingredients',
            function($scope, Ingredients) {
                Ingredients.all().$promise.then(
                    function(result) {
                        $scope.ingredientOptions = result.ingredients;
                    }
                );
            }
        ]
    );


    //--- FACTORIES
    rdb.factory('Recipes',
        ['$resource',
            function($resource) {
                return $resource('/api/recipe/:recipeId',
                    {},
                    {
                        all: {method: 'GET'},
                        recipe: {method: 'GET', params: {recipeId: '1'}},
                        save: {method: 'PUT'}
                    });
            }
        ]
    );

    rdb.factory('Ingredients',
        ['$resource',
            function($resource) {
                return $resource('/api/ingredients/:ingredientId',
                    {},
                    {
                        all: {method: 'GET'},
                        get: {method: 'GET', params: {ingredientId: '1'}}
                    }
                );
            }
        ]
    );
});
