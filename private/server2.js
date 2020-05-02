var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

var dirname = '/Users/Juna/Desktop/cdvrs/aprender/strwars';
var db;
const uri = "mongodb+srv://junita9:Juna.-38@aprender-pxcia.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(err => {
  const collection = client.db("test").collection("devices");
  if(err) return console.log('error');
  db = client.db('Aprender');
  var main = db.collection('main').find().toArray(function(err, results) {console.log(results)});
  app.listen(3000,(req,res)=>{console.log('escucho')});
});
//------------------

var mainSchema = mongoose.schema{
  _id: mongoose.Schema.Types.ObjectId,
  Tittle {
    Type: string,
    required: true
  },
  Author: string,
  Created{
    type: date,
    default date.now,
  }
};

var textSchema = mongoose.schema{
  _id: mongoose.Schema.Types.ObjectId,
  Parrafo{
    type: string,
    required: true,
  },
  Texto{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Main'
  }
};

var main = mongoose.model('Main',mainSchema);
var text = mongoose.model('text',textSchema);

var primertexto = new main {
  _id: new mongoose.Types.ObjectId(),
  Tittle: 'Primer cuento',
  Author: 'Juli'
};

var primertexto.save((err)=>{
  if(err) throw err;
  console.log('Texto creado con exito')
});

app.use(bodyparser.urlencoded({extended: true}));
app.get('/', (req,res)=> {
  res.sendFile(dirname + '/public/home.html');
});

app.get('/create', (req,res)=> {
  res.sendFile(dirname + '/public/create.html');
});

app.post('/create',(req,res)=>{
  body =
  db.collection('main').insertOne(req.body,(err,result)=>{
  if (err) return console.log(err);
  console.log(req.body);
  console.log(result);
  res.redirect('/');
  });
});
