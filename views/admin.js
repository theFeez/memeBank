var loggedIn;
var nuke = function(){
    $.get('/nuke',function(data){
        console.log(data);
    })
}


$.get('/loadPics',function(data){
    var pics='';
    var counter = 0;
    for(var i in data){
        if(counter == 0){
          pics = pics + '<div class="row">';
        }

        pics = pics + '<input type=\'checkbox\' name=ids[] value='+data[i].id+'><div class="col-md-2 col-xs-6 col-sm-4 img-thumbnail" style="background-image: url('+ data[i].url +');background-repeat: no-repeat; background-position: center; background-size: cover; height: 200px;"></div>';

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
