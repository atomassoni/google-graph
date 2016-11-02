UserController.$inject = ['$scope', '$http', '$location', 'UserFactory', 'DataFactory'];

myApp.controller('UserController', UserController);
 
function UserController ($scope, $http, $location, UserFactory, DataFactory) {
  // This happens after view/controller loads -- not ideal but it works for now.
  console.log('checking user');

  $scope.userName = '';
  $scope.data = [];
  $scope.labels = [];
  $scope.series = ['Amount of light'];
 

  $scope.loadData = function () {
    //if(DataFactory.factoryGetBigQueryData()===undefined) {
    DataFactory.factorySetBigQueryData().then(function () {
      $scope.data = DataFactory.factoryGetBigQueryData();
      DataFactory.factoryMakeLabels();
      $scope.labels = DataFactory.factoryGetLabels();

    });

    // } else {
    //  $scope.data = DataFactory.factoryGetBigQueryData();
    //}

  };


  $scope.makeLabels = function (quantity) {
    DataFactory.factoryMakeLabels(quantity);
    $scope.labels = DataFactory.factoryGetLabels();
  };

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  //$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
         // id: 'y-axis-1',
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

};
