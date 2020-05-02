var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var dirname = '/Users/Juna/Desktop/cdvrs/aprender/strwars';
var db;
const uri = "mongodb+srv://junita9:Juna.-38@aprender-pxcia.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  if(err) return console.log('error');
  db = client.db('Aprender');
  app.listen(3000,(req,res)=>{console.log('escucho')});

  // perform actions on the collection object
  //client.close();
});

//MongoClient.connect('mongodb+srv://junita9:Juna.-38@aprender-pxcia.mongodb.net/test?retryWrites=true&w=majority',(err, database) => {
//  if(err) return console.log('error');
//  db = client.db('Aprender');
//  app.listen(3000,(req,res)=>{console.log('escucho')});
//});

app.use(bodyparser.urlencoded({extended: true}));
app.get('/', (req,res)=> {
  res.sendFile(dirname + '/quotes.html');
});


app.post('/quotes',(req,res)=>{
  db.collection('quotes').insertOne(req.body,(err,result)=>{
  if (err) return console.log(err);
  console.log(req.body);
  console.log(result);
  res.redirect('/');
  });
});
