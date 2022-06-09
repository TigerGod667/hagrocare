let app = angular.module("myApp", []);
app.controller("my-controller", function($scope){
	$scope.appear = function(){
		let form = document.querySelector(".table-form");
		form.style.display = "block"; 	
	}
	$scope.disappear = function(){
		let form = document.querySelector(".table-form");
		form.style.display = "none"; 	
	}
	$scope.order = function(a){
		$scope.orderby = a;
	}
	// $scope.table = [
	// 	{
	// 		"src": "images/onion.jpg",
	// 		"crop_name": "Onion",
	// 		"quantity": 5,
	// 		"cost": 400
	// 	},
	// 	{
	// 		"src" : "images/potato.jpg",
	// 		"crop_name": "Potato",
	// 		"quantity": 4,
	// 		"cost": 500
	// 	},
	// 	{
	// 		"src" : "images/tomato.jpg",
	// 		"crop_name": "Tomato",
	// 		"quantity": 3,
	// 		"cost": 300
	// 	},
	// 	{
	// 		"src" : "images/brinjal	.jpg",
	// 		"crop_name": "Brinjal",
	// 		"quantity": 2,
	// 		"cost": 600
	// 	},
	// 	{
	// 		"src" : "images/beans.jpg",
	// 		"crop_name": "Beans",
	// 		"quantity": 1,
	// 		"cost": 800
	// 	}
	// ];
});
