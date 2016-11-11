var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
  console.log(data);  
})
}
