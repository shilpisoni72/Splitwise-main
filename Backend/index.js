//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
const dbController = require('./db//controllers/userController.js');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mysql',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,// Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db/models')
const { request } = require('express');

db.sequelize.sync();


app.post('/signup', function (req,res) {
  dbController.signUp(req,res);
  
});

app.post('/login',function(req,res){
  dbController.find(req,res,null,true,true);
});

app.post('/getUserByUsername',function(req,res){
  dbController.find(req,res,null,true);
});

app.get('/getAllUsers',function(req,res){
  dbController.findAllUsers(req,res);
})

app.get('/getUserBalance',function(req,res){
  dbController.find(req,res,["total_balance"]);
});

app.post('/insertLog',function(req,res){
  dbController.insertLog(req,res);
});
app.post('/getLogs',function(req,res){
  dbController.getLogs(req,res);
});


app.post('/getAllGroups',function(req,res){
  dbController.getAllGroups(req,res);
});
app.post('/getUserDetails',function(req,res){
  dbController.find(req,res);
});

app.post('/addFriend',function(req,res){
  dbController.update(req,res);

})
app.post('/sendInvite',function(req,res){
  dbController.sendAcceptInvite(req,res);
});

app.post('/sendInvite',function(req,res){
  dbController.sendAcceptInvite(req,res);
});
//require("./router/router")(app);
app.post("/addGroup",function(req,res){
  dbController.addGroup(req,res);
});
app.post("/getGroupDetails",function(req,res){
  dbController.getGroupDetails(req,res);
});

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

