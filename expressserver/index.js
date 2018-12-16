var express=require('express');
var app=express();

var fs=require('fs');
var bodyParser=require('body-parser');
var multer=require('multer');

var cors=require("cors");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('file'));

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    allowedHeaders:['Content-Type']
}));

//simple
app.get('/',function(req,res){
    res.send("I'm Zephyr.");
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 })

app.post('/file_upload',function(req,res){
    console.log(req.files[0]);
    let des_file=__dirname+"/images/"+req.files[0].originalname;
    fs.readFile(req.files[0].path,function(err,data){
        fs.writeFile(des_file,data,function(err){
            let response=null;
            if(err){
                console.log(err);
            }else{
                response={
                    retCode:10000,
                    message:'File uploaded successfully',
                    filename:req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
});

//program entry
var server=app.listen(8081,function(){
    let host=server.address().address;
    let port=server.address().port;

    console.log("This server is listening on http://%s:%s",host,port);
});