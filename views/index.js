var pics='';


        var submitURL;
var login;



function refreshPics(){
    $.get('/loadPics',function(data){

        console.log(data);
        var counter = 0;
        for(var i in data){
            if(counter == 0){
              pics = pics + '<div class="row">';
            }

            pics = pics + '<div class="col-md-2 col-xs-6 col-sm-4"><a href="'+ data[i].url + '" target="_blank"><img src=\''+data[i].url+'\'class="img-responsive img-grid img-thumbnail"> </img></a></div>';

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
};

    submitURL = function(){

        $.get('/url',{'url':$('#butt').val()},function(data){
            window.location.replace('/');
            //console.log(data);
        });

    }




    login = function(){
        $.get('/login',{'username':$('#username').val(),'password':$('#password').val()},function(data){

            console.log(data);
            /*if(data){
                window.location.replace('/admin');
            }*/



        });
    };



refreshPics();
