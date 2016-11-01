myApp.factory('DataFactory', ['$http', function ($http) {


    // PRIVATE
    var data = undefined;//user's username

    // PUBLIC
    var publicApi = {
        factoryCheckUser: function () {
            return checkUser();
        },
        factoryGetUserName: function () {
            return userName;
        },
        factoryLogout: function () {
            return logout();
        }
    }

    //Private functions

    function checkUser() {
        console.log('checking user');
        var promise = 
        $http.get('/user').then(function (response) {
            console.log('response.data: ', response.data);
            if (response.data.username) {
                // user has a current session on the server
                console.log('user has a current session');
                userName = response.data.username;
              
            } else {
             console.log('user has no current session');
                userName = undefined;
          
            }

        });

        return promise;

    }

    function logout() {
        var promise = 
        $http.get('/user/logout').then(function (response) {
            if (response.data) {
                console.log(response.data);
                userName = undefined;
            } 
        });
        return promise;
    }

return publicApi;
}]);