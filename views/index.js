var pics='';
console.log('wat');
        
        var submitURL;
var login;



function refreshPics(){
    console.log('ran it');
    $.get('/loadPics',function(data){
        
        console.log(data);
        for(var i in data){
            console.log(data[i].url);
            pics = pics+'<li><img src=\''+data[i].url+'\'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });  
};
    
    submitURL = function(){
        console.log('kk');
        $.get('/url',{'url':$('#butt').val()},function(data){
            
            //console.log(data);
        });
    }
    
    
    login = function(){
        $.get('/login',{'username':$('#username').val(),'password':$('#password').val()},function(data){
            
            console.log(data);
            if(data){
                window.location.replace('/admin');
            }
                
            
            
        });
    };
    




refreshPics();