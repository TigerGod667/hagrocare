let app = angular.module("myApp", []);

app.filter("costSymbol", function(){
	return function(input){
		return "₹" + input
	}
});

app.factory('quantity', function() {
        var randomObject = {};
        randomObject.increment = function(e, l) {
            let div_name = e.currentTarget.parentNode;
			div_name.children[4].value = parseInt(div_name.children[4].value) + 1 
        };
        randomObject.decrement = function(e) {
        	let div_name = e.currentTarget.parentNode;
			if (div_name.children[4].value != 0){
			div_name.children[4].value = parseInt(div_name.children[4].value) - 1 	
			}
        };
        return randomObject;
    });

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

app.controller("my-controller", function($scope, quantity, sideAppear){
	$scope.inc = function(e){
		quantity.increment(e);
	}
	$scope.dec = function(e){
		quantity.decrement(e);	
	}
	$scope.vanish = function(e){
		sideAppear.disapp();
	}
	$scope.appear = function(e){
		sideAppear.app();
	}
	$scope.fullDetail = function(){
		window.location.replace("http://localhost:8000/details.html");
	} ;
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
	$scope.tabler = [
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
			"src" : "images/brinjal.jpeg",
			"crop_name": "Brinjal",
			"quantity": 2,
			"cost": 600
		},
		{
			"src" : "images/beans.jpeg",
			"crop_name": "Beans",
			"quantity": 1,
			"cost": 800
		},
			{
			"src" : "images/beetroot.jpeg",
			"crop_name": "Beans",
			"quantity": 1,
			"cost": 800
		}
	];
});