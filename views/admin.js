var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
        console.log(data);
    })
}

var logout=function(){
    $.get('/logout',function(data){
        
    })
}


$.get('/loadPics',function(data){
    var pics='';
    var counter = 0;
    for(var i in data){
        if(counter == 0){
          pics = pics + '<div class="row">';
        }

        pics = pics + '<div class="col-md-2 col-xs-6 col-sm-4 img-thumbnail" style="background-image: url('+ data[i].url +');background-repeat: no-repeat; background-position: center; background-size: cover; height: 200px;"> <input type=\'checkbox\' name=ids[] value='+data[i].id+'> </div>';

        if(counter == 5){
          pics = pics + '</div>';
          counter = 0;
        }
        else{
          counter++;
        }
    }
    if(counter > 5){
      pics = pics + '</div>';
    }
    $('#picList').html(pics);




});
