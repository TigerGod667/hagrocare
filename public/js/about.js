let app = angular.module("myApp", []);
app.directive("appContent", function(){
	return {
		template: "Traditional farming is the ancient food production system and the original type of agriculture it is has been practiced for thousands of years. Traditional farming is not only the world's oldest farming method but also the main source of improving phase of farming technology like conventional, modern and organic farming it promote genetic diversity too."
	};
});
app.directive("headContent", function(){
	return{
		template: "<h4>Traditional Farming?</h4>"
	}
})