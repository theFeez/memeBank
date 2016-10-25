var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://theFeez:neonSlick@ds031157.mlab.com:31157/heroku_j9vbm98c';
var pics;
var cors = require('cors');
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'hkqs3fahn', 
  api_key: '782969347656822', 
  api_secret: 'lP4Jq9dJiqy7AcwQa6oqHbt8lRM' 
});
var clarifai=require('clarifai');

//var app = new clarifai.App('{LVTIKzCDiEEqMRd-Ql88PkXMzJmCnvqAfAk_Fn8B}','{1zSt2UIOKuYyudzcifHgX_b2DkGGyTfRqC_18Ls9}');




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
    var sfw = true;
   
   cloudinary.uploader.upload(file.path, function(result){
       console.log(result);
       /*app.models.predict(Clarifai.NSFW_MODEL, result.url).then(
          function(response) {
            console.log(response);
          },
          function(err) {
            // there was an error
              console.log('you fucked up');
          }
        );*/
       
       if(sfw){
           MongoClient.connect(url, function(err, db) {
               assert.equal(null, err);
               console.log("Connected successfully to server");
               db.collection('pics').insert({'name':file.filename,'url':result.url})

               db.close();
            });
       }
       
       
   
   });
    
    
}

app.get('/',function(req, res){
   res.sendFile(__dirname+'/views/index.html');
    
    console.log('routed bitch');
});

app.post('/upload',upload.single('image'),function(req,res){
    console.log(req.file);
    updateDB(req.file);
    res.redirect('https://memebank.herokuapp.com/');
    res.end();
    
    
});

app.get('/loadPics',function(req,res){
    console.log('tried my best');
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db.collection('pics').find().toArray(function(err, docs) {
            res.send(docs);

            db.close();
        });
        
    });
    
});

app.post('/delete',function(req,res){
   console.log(req); 
});

app.post('/login',function(req,res){
    console.log('got to login');
    console.log(req.query);
   if(req.body.user==='admin'&&req.body.pass==='getfucked'){
       console.log('authorized');
       res.redirect('/admin');
       res.end();
   } 
    else{
        console.log('fuck you');
        res.end();
    }
});

app.get('/admin',function(req,res){
    res.sendFile(__dirname+'/views/admin.html');
    
})

app.listen(process.env.PORT||500,function(){
  console.log('listening on :'+this.address().address+':'+this.address().port);
    console.log('fuk heroku');
});