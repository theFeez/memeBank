var pics='';


        var submitURL;
var login;



function refreshPics(){
    $.get('/loadPics',function(data){

        var counter = 0;
        for(var i in data){
            if(counter == 0){
              pics = pics + '<div class="row">';
            }

            pics = pics + '<a href="'+ data[i].url + '" target="_blank"><div class="col-md-2 col-xs-6 col-sm-4 img-thumbnail" style="background-image: url('+ data[i].url +');background-repeat: no-repeat; background-position: center; background-size: cover; height: 200px;"></div></a>';

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
    
    $(document).on('change', ':file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
      });

      // We can watch for our custom `fileselect` event like this
      $(document).ready( function() {
          $(':file').on('fileselect', function(event, numFiles, label) {

              var input = $(this).parents('.input-group').find(':text'),
                  log = numFiles > 1 ? numFiles + ' files selected' : label;

              if( input.length ) {
                  input.val(log);
              } else {
                  if( log ) alert(log);
              }

          });
      });


refreshPics();
