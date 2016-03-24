myApp.service('loadJSON', ['$http', function($http){
    
   this.loadNParseJSON = function () {
       
    return $http.get('assets/json/quiz.json');
        
   }
}]);