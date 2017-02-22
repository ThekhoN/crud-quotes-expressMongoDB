var express = require('express')
var app = express()

//middleware
app.use('/static', express.static('public'))
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

//views
app.set('views', __dirname + '/public/views')
app.set('view engine', 'pug')

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
  db.collection('quotes').find().toArray(function (err, results) {
    if(err){
      console.log('error in db find results: ', err);
    }
    else {
        //console.log('results: ', results)
        res.render('index', {quotes: results})
    }
  })
})

app.post('/quotes', function (req, res) {
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
