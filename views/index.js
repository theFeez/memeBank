var pics='';


        var submitURL;
var login;



function refreshPics(){
    console.log('ran it');
    $.get('/loadPics',function(data){

        console.log(data);
        var counter = 0;
        for(var i in data){
            console.log(data[i].url);
            if(counter === 0){
              pics += '<div class="row">';
            }
            pics = pics+'<div class="col-md-4"><img src=\''+data[i].url+'\'class="img-responsive img-grid"> </img></div>';
            if(counter === 3){
              pics += '</div>';
              counter = 0;
            }
            counter++;
        }
        if(counter > 3){
          pics += '</div>';
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
