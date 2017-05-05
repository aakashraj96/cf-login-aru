// adapted from http://nodejs.org/api/synopsis.html

http  = require("http")
cfenv = require("cfenv")

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

var logger = require('morgan');
var cors = require('cors');
app.use(logger('dev'));
app.use(cors());


var un;
var ps;
var len;
var resp;
var cl;

console.log("Working!!");



app.post('/test', function(request, response){
  console.log("trigerred");
if(request.method==="OPTIONS")
{console.log("nah!");}
console.log(request.body);      // your JSON
//var jsonp = JSON.parse(request);
console.log(request.body.username);
un = request.body.username;
ps = request.body.password;

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sql12.freemysqlhosting.net',
  user     : 'sql12169658',
  password : 'L2IUlmelum',
  database : 'sql12169658'
});
connection.connect();

connection.query('SELECT * from login where username = "'+un+'"', function (err, rows, fields) {
  if (err) throw err

  len = rows.length;
//console.log('The solution is: ', len);
 if(len==0)
{
resp="wrong";
console.log("wrong user");
}
else
{
cl = rows[0].clas;
if(ps==rows[0].password)
{resp="correct"+cl;console.log("correct user correct pass");}
else
{resp="wrong";console.log("correct user wrong pass");}
}

})
console.log("going to send: "+resp);
  response.json(resp);   // echo the result back
});




// get environmental information for this app
appEnv   = cfenv.getAppEnv()
instance = appEnv.app.instance_index || 0



// start the server on the calculated port and host


var server = app.listen(appEnv.port, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

//-----------------------------------------------
