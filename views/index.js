var pics='';
console.log('wat');



function refreshPics(){
    console.log('ran it');
    $.get('https://memebank.herokuapp.com/loadPics',function(data){
        
        console.log(data);
        for(var i in data){
            console.log(data[i]);
            pics = pics+'<li><img src='+data[i].url+'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });
    
    
    
}

refreshPics();

