var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://theFeez:mechboy1@ds031157.mlab.com:31157/heroku_j9vbm98c';
var pics;
var cors = require('cors');
var cloudinary = require('cloudinary');
var clarifai=require('clarifai'); 
var info;
var sfw;
var session = require('express-session');
app.use(session({
    secret: 'pinga',
    cookie:{maxAge:600000}
    
}));
//var auth=require('http-a1uth');

var bodyParser=require('body-parser');
cloudinary.config({ 
  cloud_name: 'hkqs3fahn', 
  api_key: '782969347656822', 
  api_secret: 'lP4Jq9dJiqy7AcwQa6oqHbt8lRM' 
});

/*app.use(session({
  cookieName: 'mySession',
  secret: 'kefjkWFKEjklrhkjwe',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));*/


var clarApp = new clarifai.App('LVTIKzCDiEEqMRd-Ql88PkXMzJmCnvqAfAk_Fn8B','1zSt2UIOKuYyudzcifHgX_b2DkGGyTfRqC_18Ls9');



app.use(bodyParser.text());
app.use(cors());
//app.use(express.static(__dirname ));
app.use(express.static(__dirname +'/views/'));

var storage = multer.diskStorage({
  filename: function (req, file, cb) {
      if(path.extname(file.originalname.toLowerCase())==='.jpg'||path.extname(file.originalname.toLowerCase())==='.gif'||path.extname(file.originalname.toLowerCase())==='.bmp'||path.extname(file.originalname.toLowerCase())==='.png')
          {
              cb(null, file.originalname)
          }
    
  }
});

var upload = multer({storage})

function updateDB(file,callback){
    
   
   cloudinary.uploader.upload(file.path, function(result){
       //console.log(result);
       clarApp.models.predict(Clarifai.NSFW_MODEL, result.url).then(
          function(response) {
            console.log('gucci');
              console.log(response.data.outputs[0].data);
           
              if(response.data.outputs[0].data.concepts[0].name==='nsfw'){
                  console.log('nsfw');
                  callback();
                  
              }
              else{
                console.log('sfw');
                MongoClient.connect(url, function(err, db) {
                    assert.equal(null, err);
               //console.log("Connected successfully to server");
                    db.collection('pics').insert({'name':result.url,'url':result.url})

                    db.close();
                    callback();
                
               
                });
            }
                
          },
          function(err) {
            // there was an error
              console.log(err);
              callback();
          }
           
        );
       
       

          
       
       
       
   
   });
    
    
}

function isSFW(url){
    
}

app.get('/',function(req, res){
   res.sendFile(__dirname+'index.html');
    
    console.log('routed bitch');
});

app.post('/upload',upload.single('image'),function(req,res){
    console.log('shitto');
    if(req.file===undefined){
        res.redirect('/');
          
    }
    else{
        console.log('wat');
        updateDB(req.file,function(){
            console.log('damn');
            res.redirect('/');
        }); 
        console.log('ytho');
        
    
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
              console.log(response.data.outputs[0].data.concepts);
           
              if(response.data.outputs[0].data.concepts[0].name==='nsfw'){
                  console.log('nsfw');
                  //res.redirect('/');
                  
              }
              else{
                  console.log('sfw');
                  MongoClient.connect(url, function(err, db) {
               assert.equal(null, err);
               //console.log("Connected successfully to server");
               db.collection('pics').insert({'name':result.url,'url':result.url});

               db.close();
              // res.redirect('/');
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

function isAuthenticated(req, res, next) {
    sess = req.session;
    console.log("Checking for authentication (isAuthenticated)")
    if(sess.user){
        console.log("User '"+sess.user+ "' is authenticated!")
        next();
}   else if (!sess.user){
    console.log("User not authenticated!")
    res.redirect('/');
}
}

app.get('/login', function(req,res){
    sess = req.session;
    console.log("the session is:"+sess);
        MongoClient.connect(url,function(error,db){
        if(!error){
            console.log("Connected successfully to MongoDB server");
            console.log("LOGIN INFORMATION: "+JSON.stringify(req.query));
            
            db.collection('logins').findOne({username:req.query.username}, function(error,docs){
                if(docs !== null){
                    if(docs.password == req.query.password){
                        console.log("Password correct!");
                        sess.user = docs.username;
                        console.log("session user name is "+sess.user)
                        // res.redirect("/")
                        res.send(true)
                    } 
                    else {
                        console.log("Login failed! Bad password")
                        res.send(false)
                    }

                }
                else{ 
                    console.log("Login failed! Bad Username");
                    res.send(false);
                }

            });
        } 
        else{
            console.dir(error);
            res.send(error);
        }
        db.close();
    });
});

app.get('/admin', isAuthenticated, function(req,res){
        
        console.log('admin');
        res.sendFile(__dirname+'/private/admin.html');
});

app.get('/nuke', isAuthenticated, function(req,res){
    cloudinary.api.resources(function(result) {
        var imageList=[];
        var x;
        for(x=0;x<result.resources.length;x++){
             imageList[x]=result.resources[x].public_id;
        }
           
        
        cloudinary.api.delete_resources(imageList,function(result2){
            console.log(result2);
        });
    },
    {max_results:100}); 
    MongoClient.connect(url, function(err, db) {  
        db.collection('pics').drop();
        db.close();
        
    });
});



app.listen(process.env.PORT||500,function(){
  console.log('listening on :'+this.address().address+':'+this.address().port);
    console.log('fuk heroku');
});