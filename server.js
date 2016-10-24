var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://<zachfeez@knights.ucf.edu>:<Z23f7026>@ds031157.mlab.com:31157/heroku_j9vbm98c';
var pics;


app.use(express.static(__dirname ));
app.use(express.static(__dirname +'/views'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      if(path.extname(file.originalname)==='.jpg'||path.extname(file.originalname)==='.gif'||path.extname(file.originalname)==='.bmp'||path.extname(file.originalname)==='.png')
          {
              cb(null, __dirname+'/public/uploads')
          }
    
  },
  filename: function (req, file, cb) {
      if(path.extname(file.originalname)==='.jpg'||path.extname(file.originalname)==='.gif'||path.extname(file.originalname)==='.bmp'||path.extname(file.originalname)==='.png')
          {
              cb(null, file.originalname)
          }
    
  }
});

var upload = multer({storage})

function updateDB(){
    fs.readdir(__dirname+'/public/uploads', function(err, files){
        pics = files;
    })
    
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        db.collection('pics').drop();
        for(var i in pics){
            db.collection('pics').insert({name:pics[i]})
        }
        db.close();
    });
}

app.get('/',function(req, res){
   res.sendFile(__dirname+'/views/index.html');
    updateDB();
    console.log('routed bitch');
});

app.post('/upload',upload.single('image'),function(req,res){
    console.log('posted');
    updateDB();
    res.redirect(' https://memebank.herokuapp.com/');
    res.end();
    
    
});

app.get('/loadPics',function(req,res){
    console.log('tried my best');
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
        fs.readdir(__dirname+'/public/uploads',function(err,files){
            res.send(files);                                 
        });
        db.close();
    });
    
});

app.listen(process.env.PORT||500,function(){
  console.log('listening on :'+this.address().address+':'+this.address().port);
    console.log('fuk heroku');
});