var pics='';
console.log('wat');



function refreshPics(){
    console.log('ran it');
    $.get('http://100.65.6.81:9001/loadPics',function(data){
        
        console.log(data);
        for(var i in data){
            pics = pics+'<li><img src=\'http://100.65.6.81:9001/public/uploads/'+data[i]+'\'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });
    
    
    
}

refreshPics();

