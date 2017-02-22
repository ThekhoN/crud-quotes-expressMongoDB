var express = require('express')
var app = express()

//middleware
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//db
var db
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://thekho:user-quotes@ds157539.mlab.com:57539/user-quotes', function (err, database) {
  if(err){
    console.log('error connecting to db: ', err);
  }
  else {
    db = database
    app.listen(3000, function () {
      console.log('app running on 3000')
    })
  }
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', function (req, res) {
  //res.send('handling GET req for /quotes route');
  db.collection('quotes').save(req.body, function (err, result) {
    if(err){
      console.log('error in post to database, route: /quotes...');
    }
    else {
      console.log('post to database...');
      res.redirect('/')
    }
  })
})
