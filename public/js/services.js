let app = angular.module("myApp", []);
app.controller("head-controller", function($scope){
	$scope.head = "Platform b/w Farmer and Shopkeeper";
});
app.controller("para-controller", function($scope){
	$scope.para = "It is an open-source platform that uses peer-to-peer connectors and usage policies for the secure transfer of yields, products between organizations and farmers. Farmers access and adopt better services and practices to increase their yields and incomes. Organizations(shop keeper) grow business to better serve constituents in a coordinated, cost-effective ecosystem. This peer-to-peer connection allows for decentralized yield and product sharing without having to going through a third party.";
});