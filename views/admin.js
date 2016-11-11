var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
        console.log(data);  
    })
}


$.get('/loadPics',function(data){
    var pics;
    console.log(data);
    for(var i in data){
        console.log(data[i].url);
        pics = pics+'<li><img src=\''+data[i].url+'\'</img></li>';

    }

    $('#picList').html(pics);


});  
