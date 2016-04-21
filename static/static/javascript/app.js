var app = angular.module('UserApp', [
    'ui.router',
    'restangular'
])

app.config(function ($stateProvider, $urlRouterProvider, RestangularProvider) {
    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('index', {

            url: "/",
            templateUrl: "/static/html/partials/_user_list.html",
            controller: "UserList"
        })

       .state('new', {

            url: "/new",
            templateUrl: "/users/user-form",
            controller: "UserFormCtrl"
        })
})

app.controller("JobFormCtrl", ['$scope', 'Restangular', 'CbgenRestangular', '$q',
function ($scope, Restangular, CbgenRestangular, $q) {

    $scope.submitJob = function () {
    var post_update_data = create_resource($scope, CbgenRestangular);
        $q.when(post_update_data.then(
            function (object) {
                // success!
            },

            function (object){
                // error!
                console.log(object.data)
            }

        ))
    }

}])// end controller

app.factory('CbgenRestangular', function (Restangular) {
    return Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl('/api/v1');
    });
})

populate_scope_values = function ($scope) {
    return {name: $scope.name, description: $scope.description };
},

create_resource = function ($scope, CbgenRestangular) {
var post_data = populate_scope_values($scope)
    return CbgenRestangular.all('user/').post(post_data)
}
