
var app = angular.module("myApp", ["ngRoute"]);

app.controller('myCtrl', function($scope,$http,$location,$window) {
    $scope.carname = "Volvo";
$scope.UserEmail="user1@gmail.com";
$scope.UserPassword="1234";
$scope.current;
$scope.uName="admin";
$scope.Upassword="1234";
// user localStodage
$scope.storageUserName= localStorage.getItem("userUser");
$scope.storageUserPwd= localStorage.getItem("userPwd");
// admin storage

$scope.storageAdminName=localStorage.getItem("adminName");
$scope.storagePwd=localStorage.getItem("adminPwd");
$scope.storageAdminUser=localStorage.getItem("adminUser");

if($location.$$path=="/employee"){
    var user=$scope.storageUserName;
    var pwd=$scope.storageUserPwd;
    $http.get("user.json")
    .then(function(response) {
        if(response.status==200){
            
            $scope.current=undefined;
            angular.forEach(response.data, function(value, key) {
              
if(Boolean(value.email==user) && Boolean(value.password==pwd)){
    $scope.current=value;
}
              });
            }
        });

}else if($location.$$path=="/admin"){
    if($scope.storageAdminName&&$scope.storagePwd&&$scope.storageAdminUser){
       
        $http.get("user.json")
    .then(function(response) {

        if(response.status==200){
            $scope.user=response.data;

            angular.forEach(response.data, function(value, key) {
              
                if(Boolean(value.name==$scope.storageAdminName)){
                    $scope.current=value;
                }
                              });
        }
    });
    }


}
// admin Login

$scope.adminLogin=function(name,user,pwd){
    $scope.getUsers(name);
    if(Boolean(user!='admin') && Boolean(pwd!='1234')){
        alert("please enter valid Details");
        return;
    }else{
      $location.url('/admin');
      $scope.getUsers(name);
    }
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminPwd", pwd);
    localStorage.setItem("adminUser",user);
    $http.get("user.json")
    .then(function(response) {

        if(response.status==200){
            $scope.user=response.data;
        }
    });
}
$scope.getUsers=function(name){
    $http.get("user.json")
    .then(function(response) {
        if(response.status==200){
            debugger;
            $scope.current=undefined;
            angular.forEach(response.data, function(value, key) {
              
if(Boolean(value.name==name)){
    $scope.current=value;
}
              });
             

        }

    });
}

// End

// Employee login
$scope.employeeLogin=function(user,pwd){
    $http.get("user.json")
    .then(function(response) {
        if(response.status==200){
            
            $scope.current=undefined;
            localStorage.setItem("userUser", user);
            localStorage.setItem("userPwd", pwd);
            angular.forEach(response.data, function(value, key) {
              
if(Boolean(value.email==user) && Boolean(value.password==pwd)){
    $scope.current=value;
}
              });
              if(!Boolean($scope.current)){
                  alert("please enter valid Details");
              }else{


                $location.url('/employee');
              }

        }

    });
   }
// Borwser inactive operations


function setup() {
    this.addEventListener("mousemove", resetTimer, false);
    this.addEventListener("mousedown", resetTimer, false);
    this.addEventListener("keypress", resetTimer, false);
    this.addEventListener("DOMMouseScroll", resetTimer, false);
    this.addEventListener("mousewheel", resetTimer, false);
    this.addEventListener("touchmove", resetTimer, false);
    this.addEventListener("MSPointerMove", resetTimer, false);
 
    startTimer();
}
setup();
 
function startTimer() {
    // wait 3 minutes before calling goInactive
    timeoutID = window.setTimeout(goInactive, 30000);
}
 
function resetTimer(e) {
    window.clearTimeout(timeoutID);
 
    goActive();
}
 
function goInactive() {
    // do something
   if($location.$$path!="/"){
    if (window.confirm("Do you want to navigate Login?")) { 
        $window.location.href = '/#';
      }
   }
    
    

}
 
function goActive() {
    // do something
         
    startTimer();
}

// End
   
});
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login.html"
    })
    .when("/admin", {
        templateUrl : "admin.html"
    })
    .when("/employee", {
        templateUrl : "employee.html"
    })
});