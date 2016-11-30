var pics='';
console.log('wat');
        
        var submitURL;
var login;



function refreshPics(){
    console.log('ran it');
    $.get('/loadPics',function(data){
        
        console.log(data.pics);
        for(var i in data.pics){
            console.log(data.pics[i].url);
            pics = pics+'<li><img src=\''+data.pics[i].url+'\'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });  
};
    
    submitURL = function(){
        console.log('kk');
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