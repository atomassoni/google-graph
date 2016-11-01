myApp.controller('UserController', ['$scope', '$http', '$location', 'UserFactory', function ($scope, $http, $location, UserFactory) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.userName = '';
  $scope.data = [];
   $scope.labels = [];

  $scope.loadData = function () {
    $http.get('/data').then(function (response) {
      $scope.data = response.data;
      $scope.labels = response.data.map(function (item) {
        return item.x;
      });
      console.log(response.data);
    });
  };


  $scope.labels = [];
  $scope.series = ['Series A'];

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  //$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
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
