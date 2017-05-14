
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    var vm = $scope;
    vm.value= []
    vm.data = [{
      id:1,
      name:'Abhilash'
    },{
      id:2,
      name:'Saran'
    },{
      id:3,
      name:'Karthick'
    },{
      id:1,
      name:'barath'
    },{
      id:2,
      name:'geetha'
    },{
      id:3,
      name:'Paul'
    },{
      id:1,
      name:'sudhakar'
    },{
      id:2,
      name:'mahesh'
    },{
      id:3,
      name:'vel pandy'
    },{
      id:1,
      name:'tariq'
    },{
      id:2,
      name:'suchita'
    },{
      id:3,
      name:'sujatha'
    }]
    vm.updateModel = function(){
      console.log(vm.output)
    }
});
app.directive("myDir",function($compile,$filter){
  return {
    restrict : "AE",
    replace: true,
    template:'<input class="form-control" style="width:300px;" type="text"/>',
    require: ['ngModel'],
    scope:{
      data:"=data",
      model: '=ngModel',
      change : '&ngChange',
      displayName : '=idProp',
      output : '=ngOutput'
    },
    controller:function($scope){
      var op = []
      $scope.setValue = function(input) {
        console.log(input)
        op.push(input)
      }
    },
    link:function(scope, element,ctrl,attr){
      var content = "";

      scope.$watch('model', function(){
        if( scope.model != null && scope.model != '' && scope.model != undefined){
          if( scope.model.length > 0 ){
            createData(scope.model);
            $('#ab-drop').css("display", "block");
          }
        }else{
          createData('all');
        }
        //ctrl.$setViewValue(scope.model);
       });



      element.bind('focus', function(){
        if( scope.model != null && scope.model != '' && scope.model != undefined){
          if( scope.model.length > 0 ){
            createData(scope.model);
          }
        }else{
          console.log('called');
          createData('all');
          $('#ab-drop').css("display", "block");
        }
      });

      element.bind('blur', function(){
        //  $('#ab-drop').css("display", "none");
      });

      scope.output = [];
      function setValue(input){
        scope.output.push(input)
        console.log(input)
        //ctrl.$setViewValue(output.toString());
      }

      function createTemplate(arr){
        content = angular.element('<ul class="dropdown-menu" id="ab-drop" style="width:300px;">');
        if(arr.length > 0 ){
          for(let i = 0, len = arr.length; i < len; i++){
            content.append('<li><span><input type="checkbox" ng-click="setValue('+arr[i]+')" /><font>'
            +arr[i][scope.displayName]+'</font></span></li>');
          }
        }else{
          content.append("<li><center>No results found</center></li>");
        }
        content.append("</ul>");
        $compile(content)(scope)
        element.after(content);
      }

      var createData = function(model){
        var arr = [];
        content = "";
        if(model != 'all'){
          arr = $filter('filter')(scope.data,{name:model});
        }else{
          arr = scope.data;
        }
        $('#ab-drop').empty();
        $('#ab-drop').remove();
        createTemplate(arr);
      }
      return element
    }
  }
});