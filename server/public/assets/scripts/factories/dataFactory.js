myApp.factory('DataFactory', ['$http', function ($http) {

    // PRIVATE
    var bigqueryData = undefined;//user's username
    var labels = undefined;


    // PUBLIC
    var publicApi = {
        factorySetBigQueryData: function () {
            return getBigQueryData();
        },
        factoryGetBigQueryData: function () {
            return bigqueryData;
        },
        factoryGetLabels: function () {
            return labels;
        },
        factoryMakeLabels: function () {
            return makeLabels();
        }
    };

    return publicApi;
    //Private functions

    function getBigQueryData() {
 
        var promise =
            $http.get('/data').then(function (response) {
                bigqueryData = response.data;
                console.log(bigqueryData);
            });

        return promise;

    }

    function makeLabels() {
        
        labels = bigqueryData.map(function (item) {
      
                return item.x;
                
        });
        console.log(labels);
    }



}]);