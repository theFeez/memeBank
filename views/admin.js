var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
        console.log(data);  
    })
}


$.get('/loadPics',function(data){
    var pics='';
    console.log(data);
    for(var i in data.pics){
        console.log(i);
        console.log(data.pics[i].id);
        pics = pics+'<li><input type=\'checkbox\' name=ids[] value='+data.pics[i].id+'><img src=\''+data.pics[i].url+'\'</img></li>';

    }

    $('#picList').html(pics);


});  
