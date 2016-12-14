var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
        console.log(data);  
    })
}


$.get('/loadPics',function(data){
    var pics='';
    console.log(data);
    for(var i in data){
        console.log(i);
        console.log(data[i].id);
        pics = pics+'<li><input type=\'checkbox\' name=ids[] value='+data[i].id+'><img src=\''+data[i].url+'\'</img></li>';

    }

    $('#picList').html(pics);


});  
