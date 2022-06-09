app = angular.module("myApp", []);

app.service('sideAppear', function(){
	this.app = function(){
		let cart = document.querySelector(".side-cart");
		cart.style.width = "26.9%";
	}
	this.disapp = function(){
		let cart = document.querySelector(".side-cart");
		cart.style.width = 0;
	}
});

app.controller("my-controller", function($scope, sideAppear){
	$scope.vanish = function(e){
		sideAppear.disapp();
	}
	$scope.appear = function(e){
		sideAppear.app();
	}
	$scope.table = [
		{
			"src": "images/onion.jpeg",
			"crop_name": "Onion",
			"quantity": 5,
			"cost": 400
		},
		{
			"src" : "images/potato.jpeg",
			"crop_name": "Potato",
			"quantity": 4,
			"cost": 500
		},
		{
			"src" : "images/tomato.jpeg",
			"crop_name": "Tomato",
			"quantity": 3,
			"cost": 300
		},
		{
			"src" : "images/brinjal	.jpeg",
			"crop_name": "Brinjal",
			"quantity": 2,
			"cost": 600
		},
	];
});