var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var handlebars = require('handlebars');

app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/cadaveres',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Base creada');
});

var mainSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    Type: String
    //required: true,
    //maxlength: 100
  },
  description: {
    Type: String
    //maxlength: 140
  },
  author: String,
  created:{
    type: Date,
    default: Date.now
  },
  status:{
  type: Boolean
  //default: true
  },
  pswd:{
    type: String,
    required: true
  }
});

var textSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  parrafo:{
    type: String,
    required: true,
  },
  idText:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Main'
  },
  created:{
    type: Date,
    default: Date.now
  }
});

var main = mongoose.model('Main',mainSchema);
var text = mongoose.model('Text',textSchema);


app.get('/', (req,res)=> {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/create', (req,res)=> {
  res.sendFile(__dirname + '/public/create.html');
});

app.get('/write/:id', (req,res)=> {
  //meter handlebars para mandar id y para renderear el Parrafo
  var lastparragraph = text.findOne({txt_id: req.params.id }.sort({ _id: -1 }).limit(1), function(err, user) {
    if(err) console.log(err)});
  res.sendFile(__dirname + '/public/write.html');
});

app.post('/create', (req,res)=> {
  var newText = new main({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    pswd: req.body.pswd
  });
  newText.save((err)=>{
    if(err) throw err;
    console.log('Texto creado con exito');
    console.log(newText);
  });
  var newParrafo = new text ({
    _id: new mongoose.Types.ObjectId(),
    parrafo: req.body.parragraph,
    idText: newText._id
  });
  newParrafo.save((err)=>{
    if(err) throw err;
    console.log('nuevo parrafo añadido');
    console.log(newParrafo);
  });

  res.sendFile(__dirname + '/public/home.html');
});

app.post('/write/:id', (req,res)=> {
  var newParrafo = new text ({
    _id: new mongoose.Types.ObjectId(),
    parrafo: req.body.parragraph,
    id_txt: req.params.id
  });
  newParrafo.save((err)=>{
    if(err) throw err;
    console.log('nuevo parrafo añadido');
    console.log(newParrafo);
  });

  res.sendFile(__dirname + '/public/home.html');
});

app.get('/search', (req,res)=> {
  res.sendFile(__dirname + '/public/search.html');
});

app.listen(3000, function () {
    console.log('The app is listening on port 3000!!');
});
