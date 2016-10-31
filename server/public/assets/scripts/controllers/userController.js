myApp.controller('UserController', ['$scope', '$http', '$location', 'UserFactory', function ($scope, $http, $location, UserFactory) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.userName = '';

  UserFactory.factoryCheckUser().then(function () {
    redirectHome();
    $scope.userName = UserFactory.factoryGetUserName();
  });


  $scope.logout = function () {
    UserFactory.factoryLogout().then(function () {
    redirectHome();
  });
  }

  function redirectHome() {
    if (UserFactory.factoryGetUserName() === undefined) {
      $location.path("/home");
    }
  }

}]);
