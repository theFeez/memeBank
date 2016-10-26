var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/memeBox';
var pics;
var cors = require('cors');
var cloudinary = require('cloudinary');
var clarifai=require('clarifai'); 
var info;
var sfw;
var bodyParser=require('body-parser');
cloudinary.config({ 
  cloud_name: 'hkqs3fahn', 
  api_key: '782969347656822', 
  api_secret: 'lP4Jq9dJiqy7AcwQa6oqHbt8lRM' 
});


var clarApp = new clarifai.App('LVTIKzCDiEEqMRd-Ql88PkXMzJmCnvqAfAk_Fn8B','1zSt2UIOKuYyudzcifHgX_b2DkGGyTfRqC_18Ls9');



app.use(bodyParser.text());
app.use(cors());
app.use(express.static(__dirname ));
app.use(express.static(__dirname +'/views'));

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
      if(path.extname(file.originalname)==='.jpg'||path.extname(file.originalname)==='.gif'||path.extname(file.originalname)==='.bmp'||path.extname(file.originalname)==='.png')
          {
              cb(null, file.originalname)
          }
    
  }
});

var upload = multer({storage})

function updateDB(file){
    
   
   cloudinary.uploader.upload(file.path, function(result){
       //console.log(result);
       clarApp.models.predict(Clarifai.NSFW_MODEL, result.url).then(
          function(response) {
            console.log('gucci');
              console.log(response.data.outputs[0].data);
           
              if(response.data.outputs[0].data.concepts[0].name==='nsfw'){
                  console.log('nsfw');
                  
                  
              }
              else{
                  console.log('sfw');
                   MongoClient.connect(url, function(err, db) {
               assert.equal(null, err);
               //console.log("Connected successfully to server");
               db.collection('pics').insert({'name':result.url,'url':result.url})

               db.close();
               
            });
                  
                  
              }
          },
          function(err) {
            // there was an error
              console.log(err);
          }
        );
       
       

          
       
       
       
   
   });
    
    
}

function isSFW(url){
    
}

app.get('/',function(req, res){
   res.sendFile(__dirname+'/views/index.html');
    
    console.log('routed bitch');
});

app.post('/upload',upload.single('image'),function(req,res){
    //console.log(req.file);
    if(req.file===undefined){
        res.redirect('/');
        res.end();  
    }
    else{
        updateDB(req.file);
    res.redirect('/');
        
    res.end();
    }
    
    
    
});

app.get('/loadPics',function(req,res){
   // console.log('tried my best');
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        //console.log("Connected successfully to server");
        db.collection('pics').find().toArray(function(err, docs) {
            res.send(docs);

            db.close();
        });
        
    });
    
});

app.post('/delete',function(req,res){
  // console.log(req); 
});

app.get('/url',function(req,res){
    console.log(req.query); 
    console.log('you fucked');
    cloudinary.uploader.upload(req.query.url, function(result){
        clarApp.models.predict(Clarifai.NSFW_MODEL, result.url).then(
          function(response) {
            console.log('gucci');
              console.log(response.data.outputs[0].data.concepts[0].name);
           
              if(response.data.outputs[0].data.concepts[0].name==='nsfw'){
                  console.log('nsfw');
                  res.redirect('/');
                  
              }
              else{
                  console.log('sfw');
                  MongoClient.connect(url, function(err, db) {
               assert.equal(null, err);
               //console.log("Connected successfully to server");
               db.collection('pics').insert({'name':result.url,'url':result.url})

               db.close();
               res.redirect('/');
                res.end();
            });
                  
                  
              }
          },
          function(err) {
            // there was an error
              console.log(err);
          }
        );
       
       
        
        
        
    });
    
    
});

app.get('/admin',function(req,res){
    res.sendFile(__dirname+'/views/admin.html');
    
})

app.listen(process.env.PORT||500,function(){
  console.log('listening on :'+this.address().address+':'+this.address().port);
    console.log('fuk heroku');
});