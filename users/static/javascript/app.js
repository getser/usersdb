// Модуль
var UserDBApp = angular.module("UserDBApp", [])

.constant("baseUrl", "http://127.0.0.1:8000/api/v1/user/")
.constant("suffixUrl", "?format=json")

// Сервис
UserDBApp.factory("XLSXReaderService", ['$q', '$rootScope',
  function($q, $rootScope) {
    var service = function(data) {
      angular.extend(this, data);
    }
    service.readFile = function(file, readCells, toJSON) {
      var deferred = $q.defer();
      XLSXReader(file, readCells, toJSON, function(data) {
        $rootScope.$apply(function() {
          deferred.resolve(data);
        });
      });
      return deferred.promise;
    }
    return service;
  }
]);

// Контроллер
UserDBApp.controller("UserDBAppCtrl", function ($scope, $http, baseUrl, suffixUrl, XLSXReaderService) {

  $scope.initFirst=function() {
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

    $scope.choosingFields = null
    $scope.editUserIndex = null
    $scope.selectedSheetName = null
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
      request.success(function () {
        // console.log(JSON.stringify(user))
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
  }

  // Обработчик нажатия по кнопке editUser
  $scope.editUser = function (ID, index) {

    if ($scope.data.users[index].last_name && $scope.data.users[index].first_name && $scope.data.users[index].birthday && $scope.data.users[index].e_mail){
      var user = {
        id: ID,
        last_name: $scope.data.users[index].last_name,
        first_name: $scope.data.users[index].first_name,
        middle_name: $scope.data.users[index].middle_name,
        birthday: $scope.data.users[index].birthday,
        e_mail: $scope.data.users[index].e_mail
      }
    // console.log(JSON.stringify(user))
    // console.log($scope.data.users[index])

    var request = $http.put(baseUrl + ID + '/' + suffixUrl, user)
    request.success(function () {
      user = {}
      $scope.editUserIndex = null
      // $scope.initFirst() //commented as not needed...
    }); 
  }}
  
  // Обработчик нажатия по кнопке deleteUser
  $scope.deleteUser = function (ID, index) {
    // console.log(ID)
      var request = $http.delete(baseUrl + ID + '/' + suffixUrl)
      request.success(function (){
        $scope.data.users.splice(index, 1);
      }); 
    }

    $scope.showJSONPreview = true;

  $scope.fileChanged = function(files) {
      $scope.excelFile = files[0];
      XLSXReaderService.readFile($scope.excelFile, $scope.showPreview, $scope.showJSONPreview).then(function(xlsxData) {         
        $scope.sheets = xlsxData.sheets;
      });
    }

  $scope.updateJSONString = function() {
    $scope.choosingFields = 1
    $scope.new_users = $scope.sheets[$scope.selectedSheetName]
    $scope.json_string = JSON.stringify($scope.new_users, null, 2);
    $scope.new_file_labels = Object.keys($scope.new_users[0])
    // console.log('labels_to_choose_from:')
    // console.log($scope.new_file_labels)
  }

  $scope.loadUserList = function() {
    // console.log("User list loading started!")
    $scope.loading_users_list = []
    for (var user in $scope.new_users) {
      var current_user = $scope.new_users[user]
      var loading_user = {
          last_name: current_user[$scope.lname_label],
          first_name: current_user[$scope.fname_label],
          middle_name: current_user[$scope.sname_label],
          birthday: current_user[$scope.birth_label],
          e_mail: current_user[$scope.mail_label]
        }

      if (loading_user['last_name'] && loading_user['first_name'] && loading_user['birthday'] && loading_user['e_mail']){

        var request = $http.post(baseUrl + suffixUrl, loading_user)
        request.success(function () {
          console.log('uploaded:')
          console.log(loading_user)
        });
        $scope.loading_users_list.push(loading_user)
      }
    }
    // console.log('new_users_in file:')
    // console.log(JSON.stringify($scope.new_users, null, 2))
    console.log('new_users_to_upload:')
    console.log(JSON.stringify($scope.loading_users_list, null, 2))
    $scope.initFirst()
    $scope.sheets = null
  }
});
