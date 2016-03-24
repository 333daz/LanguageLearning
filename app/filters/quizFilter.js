myApp.filter('getQuiz',[function (){
   return function (inputArray,levelField,lessonNameField) {
    //    console.log (lessonNameField);
    
        if(lessonNameField == undefined || lessonNameField == '') 
            return [];
        else{
            var lessonObject = inputArray[lessonNameField];
            
            for(var i = 0; i < lessonObject.length; i++) {
                if (lessonObject[i].level == levelField) {
                    
                // console.log(lessonObject[i].questionSet[1].options);
                    return [lessonObject[i]];
                }
                
            }
            
        }
    }
}])