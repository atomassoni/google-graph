myApp.controller('UserController', ['$scope', '$http', '$location', 'UserFactory', function ($scope, $http, $location, UserFactory) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.userName = '';
  $scope.data = '';

  $scope.loadData = function () {
    $http.get('/data').then(function (response) {
      $scope.data = JSON.stringify(response.data);
    });
  };

  $scope.pubsub = function () {
    $http.get('/particledata').then(function (response) {
      $scope.data = JSON.stringify(response.data.particle);
    });
  };
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
