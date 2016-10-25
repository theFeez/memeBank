var pics='';
console.log('wat');



function refreshPics(){
    console.log('ran it');
    $.get('/gay',function(data){
    console.log('yep');
    console.log(data);  
});
    
    function submitURL(){
        console.log('kk');
        $.get('/url',{'url':'http://i.imgur.com/Zb2Hanw.jpg'},function(data){
            console.log(data.concepts[0].concepts);
        });
    }
   /* $.get('/loadPics',function(data){
        
        console.log(data);
        for(var i in data){
            console.log(data[i].url);
            pics = pics+'<li><img src=\''+data[i].url+'\'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });*/
    
    
    
}



refreshPics();

