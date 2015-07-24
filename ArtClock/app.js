var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//sever start
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listo http://%s:%s', host, port);
});

//flickr


var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "62c363500315470baf4f15bda5f30618",
      secret: "249ecda807ed356a"
    };


//sockets io
var io = require('socket.io').listen(server);
io.on('connection', function(client) {  
    client.on('join', function(data) {
        console.log(data);
        
        
       

    });

});

function sendTime() {
    Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            
            flickr.photos.getRecent({
            extra : "art",
            per_page : "2",
            page : "1"
          }, function(err, result) {
            if(err) { console.log(err); }
            var base= "http://farm";
            base+=result.photos.photo[0].farm+".static.flickr.com/";
            base+=result.photos.photo[0].server+"/"+result.photos.photo[0].id+"_"+result.photos.photo[0].secret;
            base+="_b.jpg";
            url = base;
            titulo =result.photos.photo[0].title;
            var base= "http://farm";
            base+=result.photos.photo[1].farm+".static.flickr.com/";
            base+=result.photos.photo[1].server+"/"+result.photos.photo[1].id+"_"+result.photos.photo[1].secret;
            base+="_b.jpg";
            url2 = base;
            titulo2 =result.photos.photo[1].title;
            io.emit('imagen', { url : url , titulo : titulo , url2 : url2 , titulo : titulo2 });
                
          });
        });

}

setInterval(sendTime, 20000);


module.exports = app;
