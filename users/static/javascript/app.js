  // Модуль
var UserDBApp = angular.module("UserDBApp", [])

.constant("baseUrl", "http://127.0.0.1:8000/api/v1/user/")
.constant("suffixUrl", "?format=json")

// Контроллер
UserDBApp.controller("UserDBAppCtrl", function ($scope, $http, baseUrl, suffixUrl) {

  $scope.initFirst=function(){

    var promise =  $http.get(baseUrl + suffixUrl);
    promise.then(fulfilled, rejected)

    function fulfilled(response) {
      console.log("Status: " + response.status);
      console.log("Type: " + response.headers("content-type"));
      console.log("Length: " + response.headers("content-length"));

      var model = {users:[]};
      model.users = response.data.objects;
      $scope.data = model;
      }

    function rejected(error) {
      console.log("presponse3")
      console.error(error.status);
      console.error(error.statusText);
      }
    }

  // Обработчик нажатия по кнопке addNewUser
  $scope.addNewUser = function () {
    $scope.editUserIndex = null
    if ($scope.LAST_NAME && $scope.FIRST_NAME && $scope.DATE_OF_BIRTH && $scope.E_MAIL){
        var user = {
          last_name: $scope.LAST_NAME,
          first_name: $scope.FIRST_NAME,
          middle_name: $scope.SECOND_NAME,
          birthday: $scope.DATE_OF_BIRTH,
          e_mail: $scope.E_MAIL
        }

      var request = $http.post(baseUrl + suffixUrl, user)
      request.success(function ( ){

        // console.log(JSON.stringify(user))

        // $scope.data.users.push(user);

        $scope.LAST_NAME = ""
        $scope.FIRST_NAME = ""
        $scope.SECOND_NAME = ""
        $scope.DATE_OF_BIRTH = ""
        $scope.E_MAIL = ""

        $scope.initFirst()

      });   
  }}  

  // Обработчик editUserSwitcher
  $scope.editUserSwitcher = function (ID, index) {
    $scope.editUserIndex = index

    // $scope.LAST_NAME_EDIT = $scope.data.users[index].last_name
    // $scope.FIRST_NAME_EDIT = $scope.data.users[index].first_name
    // $scope.SECOND_NAME_EDIT = $scope.data.users[index].middle_name
    // $scope.DATE_OF_BIRTH_EDIT = $scope.data.users[index].birthday
    // $scope.E_MAIL_EDIT = $scope.data.users[index].e_mail
  }

  // Обработчик нажатия по кнопке editUser
  $scope.editUser = function (ID, index) {
  //
    // $scope.data.users[index].last_name = $scope.LAST_NAME_EDIT
    // $scope.data.users[index].first_name = $scope.FIRST_NAME_EDIT
    // $scope.data.users[index].middle_name = $scope.SECOND_NAME_EDIT
    // $scope.data.users[index].birthday = $scope.DATE_OF_BIRTH_EDIT
    // $scope.data.users[index].e_mail = $scope.E_MAIL_EDIT


    // if ($scope.LAST_NAME_EDIT && $scope.FIRST_NAME_EDIT && $scope.DATE_OF_BIRTH_EDIT && $scope.E_MAIL_EDIT){
    if ($scope.data.users[index].last_name && $scope.data.users[index].first_name && $scope.data.users[index].birthday && $scope.data.users[index].e_mail){
        var user = {
          id: ID,
          last_name: $scope.data.users[index].last_name,
          first_name: $scope.data.users[index].first_name,
          middle_name: $scope.data.users[index].middle_name,
          birthday: $scope.data.users[index].birthday,
          e_mail: $scope.data.users[index].e_mail
          // e_mail: "no@mail.not"
        }

      console.log(JSON.stringify(user))
      console.log($scope.data.users[index])

      var request = $http.put(baseUrl + ID + '/' + suffixUrl, user)
      request.success(function (){
        user = {}
        $scope.editUserIndex = null
        $scope.LAST_NAME_EDIT = ""
        $scope.FIRST_NAME_EDIT = ""
        $scope.SECOND_NAME_EDIT = ""
        $scope.DATE_OF_BIRTH_EDIT = ""
        $scope.E_MAIL_EDIT = ""

        // $scope.initFirst() //commented as not needed...

      }); 
  }
}

  // Обработчик нажатия по кнопке deleteUser
  $scope.deleteUser = function (ID, index) {
    // console.log(ID)

      var request = $http.delete(baseUrl + ID + '/' + suffixUrl)
      request.success(function (){

        $scope.data.users.splice(index, 1);

      }); 
    }  

});