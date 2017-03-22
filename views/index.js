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

            pics = pics + '<div class="col-md-4 col-xs-12 col-sm-6"><img src=\''+data[i].url+'\'class="img-responsive img-grid img-thumbnail"> </img></div>';

            if(counter == 2){
              pics = pics + '</div>';
              counter = 0;
            }
            else{
              counter++;
            }
        }
        if(counter > 2){
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

    var inputs = document.querySelectorAll( '.inputfile' );
    Array.prototype.forEach.call( inputs, function( input )
    {
    	var label	 = input.nextElementSibling,
    		labelVal = label.innerHTML;

    	input.addEventListener( 'change', function( e )
    	{
    		var fileName = '';
    		if( this.files && this.files.length > 1 )
    			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    		else
    			fileName = e.target.value.split( '\\' ).pop();

    		if( fileName )
    			label.querySelector( 'span' ).innerHTML = fileName;
    		else
    			label.innerHTML = labelVal;
    	});
    });



refreshPics();
