'use strict';

/**
 * @ngdoc function
 * @name calculatorApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculatorApp
 */
angular.module('calculatorApp')
  .controller('MainCtrl', function ($scope) {
    $scope.list=[];
    $scope.result="";
    $scope.data={
        "1":["AC","+/-","%","÷"],
        "2":["7","8","9","×"],
        "3":["4","5","6","－"],
        "4":["1","2","3","＋"],
        "5":["0",".","="]
    };
   $scope.showClass=function(index,a){
       if(a==0){
           return "zero";
       }
       return index==3||a=="="?"end-no":"normal";
   };
        //表示是否要重新开始显示
   $scope.flag=true;
   $scope.history=["<<"];
   $scope.showResult=function(a){
       var reg=/\d/ig,regDot=/\./ig,regAbs=/\//ig,regOperator=/\＋|\－|\×|\÷|\=/g;
       if(reg.test(a)){
           if($scope.result!=0&&$scope.flag&&$scope.result!="error"){
               $scope.result+=a;
           }
           else{
               $scope.result=a;
               $scope.flag=true;
               if($scope.list[$scope.list.length-1]=='fx'){
                   $scope.list.pop();
               }
           }
           console.log($scope.list);
       }
       else if(a=="AC"){
           $scope.result=0;
           $scope.list=[];
           $scope.history=["<<"];
       }
       else if(a=="."){
           if($scope.result!=""&&!regDot.test($scope.result)){
               $scope.result+=a;
           }
       }
       else if(regAbs.test(a)){
           if($scope.result>0){
               $scope.result="-"+$scope.result;
           }
           else{
               $scope.result=Math.abs($scope.result);
           }
       }
       else if(a=="%"){
           $scope.result=$scope.format(Number($scope.result)/100);

           $scope.history.push(a);
       }
       else if($scope.checkOperator(a)&&$scope.result!=""&&$scope.result!="error"){
                $scope.flag=false;
                if($scope.history[$scope.history.length-1]=='>>'){
                    $scope.history=["<<"];
                }
                $scope.history.push($scope.result);
                 $scope.history.push(a);


                   if($scope.list[$scope.list.length-1]!="fx"){
                       $scope.list.push($scope.result);

                       console.log($scope.list);
                       if($scope.list.length==1){
                           $scope.list.push(a);

                       }
                       else if($scope.list.length==3){
                           $scope.calculate(a);
                       }
                   }
           if(a=="="){
               $scope.history.push($scope.result);
               $scope.history.push(">>");
           }

       }
   };
       $scope.calculate=function(a) {
           console.log('cal');
           var left = $scope.list.shift();
           console.log(left);
           var operator = $scope.list.shift();
           console.log(operator);
           var right = $scope.list.shift();
           console.log(right);
           switch (operator) {
               case "＋":
                   $scope.result = $scope.format(Number(left) + Number(right));
                   if(a!="="){
                       $scope.list.push($scope.result, a,"fx");
                   }
                   break;
               case "－":
                   $scope.result = $scope.format(Number(left) - Number(right));
                   if(a!="="){
                       $scope.list.push($scope.result, a,"fx");
                   }
                   break;
               case "×":
                   $scope.result = $scope.format(Number(left) * Number(right));
                   if(a!="="){
                       $scope.list.push($scope.result, a,"fx");
                   }
                   break;
               case "÷":
                   if(right==0){
                       $scope.result="error";
                       $scope.list=[];
                   }
                   else{
                       $scope.result = $scope.format(Number(left) / Number(right));
                       if(a!="="){
                           $scope.list.push($scope.result, a,"fx");
                       }
                   }

                   break;

               default:break;
           }

           console.log($scope.list);
       };
        $scope.format=function(num){
        var regNum=/.{10,}/ig;
         if(regNum.test(num)){
             if(/\./.test(num)){
                 return num.toExponential(3);
             }
             else{
                 return num.toExponential();
             }
         }
            else{
             return num;
         }
        }
       $scope.checkOperator=function(opt){
           if(opt=="＋"||opt=="－"||opt=="×"||opt=="÷"||opt=="="||opt=="%"){
               return true;
           }
           return false;
       }

  });
