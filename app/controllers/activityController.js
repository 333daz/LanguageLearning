var quiz;
var scoreGained;
// var currentQuestionSet;

myApp.controller('activityController', ['$scope','$localStorage', '$http', 'loadJSON', function($scope, $http, $localStorage, loadJSON){
   
   $scope.answers = {
       answerSet:["", ""],
       check: []
   };
   
   $scope.correctionList = {
       status:[],
       answers:[]
   };
   
   loadJSON.loadNParseJSON().success(function(data){
       $scope.lessonNameList = data.lessons; 
       quiz = data;
       $scope.lessonList = quiz; 
    });
    
    $localStorage.list = quiz;
    
    
  //Submit button action  
  $scope.submitQuiz = function (x) {
      calculateScore();
      var quizResult = {
          "lesson": $scope.lessonNameField,
          "score": scoreGained,
          "passed": scoreGained >=5? "yes": "no",
          "level": $scope.levelField,
          "date": getFormatedDate(new Date()),
      }
      
      $scope.status=quizResult;
      saveQuizResult(quizResult);
      
      document.getElementById("notificationDiv").style.top = "0px";
      
    //   resetModels();
  }
  
  function getFormatedDate(date) {
        var dd = (date.getDate() < 10? "0": "") + date.getDate();
        var mm = ((date.getMonth()+1) < 10? "0": "") + (date.getMonth()+1);
        var yyyy = date.getFullYear();
        return dd + "/" + mm + "/" + yyyy;
        
}
  //Save quizresult to local storage
  function saveQuizResult (quizResult) {
    var statusList = [];  
    var fetchArrayObject = localStorage.getItem('user');
    if (typeof fetchArrayObject !== 'undefined') {
        if (fetchArrayObject !== null) 
            statusList = JSON.parse(fetchArrayObject);
    }
    statusList.push(quizResult);
    localStorage.setItem('user', JSON.stringify(statusList));
  }
  
  //Toggle answer checkBoxes
  $scope.checkListToggled = function(checkList, array){
      
      
      optionIndex = array.indexOf(checkList.option);
      if(optionIndex > -1) {
          array.splice(optionIndex, 1);
      }
      else {
          array.push(checkList.option);
      }
  }
  
//   Select the corrresponding quiz from quizList
  $scope.selectQuiz = function () {
     if($scope.lessonNameField == undefined || $scope.lessonNameField == '') 
            $scope.currentQuestionSet = [];
        else{
            var lessonObject = quiz[$scope.lessonNameField];
            
            for(var i = 0; i < lessonObject.length; i++) {
                if (lessonObject[i].level == $scope.levelField) {
              
                  $scope.currentQuestionSet = lessonObject[i].questionSet;
                }
                
            }
            
        }
     
  }
  
  function calculateScore() {
    scoreGained = 0;
      for(var i=0; i < $scope.currentQuestionSet.length; i++) {
          if($scope.currentQuestionSet[i].type == 'checkBox') {
              if($scope.currentQuestionSet[i].answer.length == $scope.answers.check.length) {
                  for(var j = 0; j < $scope.answers.check.length; j++){
                      if($scope.currentQuestionSet[i].answer.indexOf($scope.answers.check[j]) > -1) {
                        $scope.correctionList.answers[i]= "";
                        scoreGained++;
                        console.log($scope.answers.check[j].toLowerCase());
                      }
                      else{
                          $scope.correctionList.answers[i]= $scope.currentQuestionSet[i].answer;
                      }
                  
                  }
              }
              else{
                  $scope.correctionList.answers[i]= $scope.currentQuestionSet[i].answer;
              }
              
          }
          else {
              if($scope.currentQuestionSet[i].answer.toLowerCase() === ($scope.answers.answerSet[i].toLowerCase())) {
                $scope.correctionList.answers[i]="";
                scoreGained = scoreGained + 2;
              }
              else {
                  $scope.correctionList.answers[i]= [$scope.currentQuestionSet[i].answer];
              }
          }
          
      }
      
  }
  
  $scope.closeNotification = function () {
      document.getElementById("notificationDiv").style.top = "-1000px";
      resetModels();
  }
  
  
  
  //reset models
  function resetModels() {
      $scope.lessonNameField = "";
      $scope.levelField = "";
      $scope.currentQuestionSet = [];
      $scope.answers = {
       answerSet:["", ""],
       check: []
   };
   $scope.correctionList = {
       status:[],
       answers:[]
   };
  }
    
}]);