var pics='';
console.log('wat');



function refreshPics(){
    console.log('ran it');
    $.get('https://memebank.herokuapp.com/loadPics',function(data){
        
        console.log(data);
        for(var i in data){
            pics = pics+'<input type=\'checkbox\'> <li><img src=\'https://memebank.herokuapp.com/public/uploads/'+data[i]+'\'</img></li>';
            
        }
        
        $('#picList').html(pics);
        
            
    });
    
    
    
}