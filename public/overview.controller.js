define(function() {
  rdb.controller('overviewController', ['$scope', 'Recipes', '$route',
  function($scope, Recipes, $route) {
    var allRecipes = Recipes.all().$promise;
    allRecipes.then(
      function(result) {
        $scope.recipes = result.recipes;
      });
    }
    ]
  );
});
