// var api_data;

// $http.get("http://127.0.0.1:8000/api/v1/user/?format=json").success(function(response){api_data = response;
//   });

// var model = {};

// model.users = api_data.objects;

// var model = {users:[
//           { id: "1", last_name: "Getmanchuk", first_name: "Sergii", second_name: "Oleksandrovich", date_of_birth: "1979-10-09", e_mail: "*****@gmail.com"},
//           { id: "2", last_name: "Umanets", first_name: "Andriy", second_name: "Ivanovich", date_of_birth: "1979-01-25", e_mail: "*****@mail.ru" },
//           { id: "3", last_name: "Donchenko", first_name: "Vitalii", second_name: "Oleksandrovich", date_of_birth: "1978-12-09", e_mail: "*****@hotmail.com"},
//           { id: "5", last_name: "Getman", first_name: "Serg", second_name: "Drovich", date_of_birth: "1989-10-09", e_mail: "*****@gmail.ua" },
//           { id: "8", last_name: "Manchuk", first_name: "Oleksandr", second_name: "Sergiyovich", date_of_birth: "1979-10-22", e_mail: "*-*-*-*-*@gmail.com"}
//       ]};

// Модуль

var UserDBApp = angular.module("UserDBApp", []);

console.log("presponse0")
// Контроллер

UserDBApp.controller("UserDBAppCtrl", function ($scope, $http) {
  console.log("presponse4")
  var promise =  $http.get("http://127.0.0.1:8000/api/v1/user/?format=json");
  promise.then(fulfilled, rejected)
  console.log("presponse1")
  function fulfilled() {
    console.log("Status: " + response.status);
    console.log("Type: " + response.headers("content-type"));
    console.log("Length: " + response.headers("content-length"));

    var model = {users:[]};
    model.users = presponse.data.objects;
    console.log("presponse2")
    $scope.data = model;

    }

  function rejected(error) {
    console.log("presponse3")
    console.error(error.status);
    console.error(error.statusText);

    }


  // Обработчик нажатия по кнопке
  $scope.addNewUser = function () {

      $scope.data.users.push({
          last_name: $scope.LAST_NAME,
          first_name: $scope.FIRST_NAME,
          second_name: $scope.SECOND_NAME,
          date_of_birth: $scope.DATE_OF_BIRTH,
          e_mail: $scope.E_MAIL
      });

        $scope.LAST_NAME = ""
        $scope.FIRST_NAME = ""
        $scope.SECOND_NAME = ""
        $scope.DATE_OF_BIRTH = ""
        $scope.E_MAIL = ""
        

      // $scope.USER = {
      //     last_name: "",
      //     first_name: "",
      //     second_name: "",
      //     date_of_birth: "",
      //     e_mail: ""}
        }

  // $scope.setStyle = function (passed) {
  //     return passed ? "color:green" : "color:red; font-weight: bold";
  // }
});