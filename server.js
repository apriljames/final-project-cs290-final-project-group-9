//Setting up the document for serving dynamically generated pages
var path = require('path');
var express = require('express');
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var port = process.env.PORT || 3330;

var mongoHost = process.env.MONGO_HOST || "classmongo.engr.oregonstate.edu";
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER || "cs290_hirschet";
var mongoPassword = process.env.MONGO_PASSWORD || "cs290_hirschet";
var mongoDBName = process.env.MONGO_DB_NAME || "cs290_hirschet";

var mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDBName}`;
var db = null;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(express.static('public'));

//Importing kitten data
// var kittenData = require('./kittenData');

//Routing

//home page
app.get('/', function(req, res, next) {
    var collection = db.collection('cats');
    collection.find({}).toArray(function(err, kitties){
      if (err) res.status(500).send("Unfortunately the database was hosted on Alderaan...");

      // else if (cats.length) {
      else{
        var kittens = {
          kittens: kitties
        }
        //console.log('==cats:', kittens);
        res.status(200).render('mainPage', kittens);
      }
      // } else {
      //   next();
      // }
    });
});

app.post('/getCat', function(req, res, next) {
  console.log('== recieved a request for cat');
  if (req.body){
    var collection = db.collection('cats');
    console.log('==ID:', req.body.id);
    collection.find(ObjectId(req.body.id)).toArray(function(err, cats){
      if (err){
        console.log('==error with DB');
        res.status(500).send("Kylo threw a tantrum and smashed the database");
      } else if (cats.length) {
        console.log('==sending cat:', cats[0]);
        res.status(200).send(cats[0]);
      } else {
        console.log('==array is empty');
        next();
      }
    })
  } else {
    res.status(400).send("invalid request");
  }
});
 
//adopt cat response
app.post('/adoptCat', function(req, res, next) {
  console.log("body:", req.body);
  if (req.body) {
    console.log("body:", req.body);
    console.log("body.id:", req.body.id);
    var collection = db.collection('cats');
    collection.find(ObjectId(req.body.id)).toArray(function(err, catArray){
      if (err) {
        res.status(500).send("Couldn't make array!");
      }
      else {
        var catObject = catArray[0];
        console.log("cat object...", catObject);

        collection.deleteOne({_id: ObjectId(req.body.id)}, function(err, result){
          if (err) {
            res.status(500).send("screwed up, database has done.");
          }
          else {
            console.log('successfully removed catto from database!');
            res.status(200).send(JSON.stringify(catObject));
          }
        });
      }
    });
  }
  else {
    res.status(400).send("u done mal");
  }
});


//receive a donated cat
app.post('/addCat', function(req, res, next) {
    if (req.body) {
      var collection = db.collection('cats');
      collection.insertOne(req.body, function(err, result){
        if (err) res.status(500).send("Ewoks have sabotaged the database!");
        else {
          console.log('==cat has been added to DB');
          console.log('==id to search:', result.insertedId);
          collection.find(ObjectId(result.insertedId)).toArray(function(err, cats){
            if (err) res.status(500).send();
            else if (cats.length){
              console.log('==sending back the new cat');
              res.status(200).send(cats[0]);
            } else res.status(400).send("yikes");
          });
        }
      });
    } else {
      res.status(400).send("Invalid Request");
    }
});

//find the perfect cat from the quiz
app.post('/perfectCat', function (req, res, next) {
  console.log("== Recieved a request for a perfect quiz cat");
  if (req.body) {
    console.log("Boddyy: ", req.body);
    var collection = db.collection('cats');
    collection.updateMany(
      {sex: req.body.sex}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for sex");
        }
      }
    );
    collection.updateMany(
      {age: req.body.age}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for age");
        }
      }
    );
    collection.updateMany(
      {chonk: req.body.chonk}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for chonk");
        }
      }
    );
    collection.updateMany(
      {cuddle: req.body.cuddle}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for cuddlyness");
        }
      }
    );
    collection.updateMany(
      {play: req.body.play}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for playfulness");
        }
      }
    );
    collection.updateMany(
      {pets: req.body.pets}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for other pets");
        }
      }
    );
    collection.updateMany(
      {coat: req.body.coat}, 
      {$inc: {quiz: 1}},
      function (err, result) {
        if (err) {
          res.status(500).send({
            error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
          });
        } else {
          console.log("We all good for coat length");
        }
      }
    );
    collection.find().sort({quiz: -1}).limit(1).toArray(function (err, cats) {
      if (err) {
        res.status(500).send({
          error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
        });
      } else {
        console.log("Here's the final array of cats ", cats);
        collection.updateMany({}, {$set: {quiz: 0}});
        res.status(200).send(cats[0]);
      }
    });
  } else {
    res.status(400).send("You messed up somehow, dunno how though with my amazing error handling...");
  }
});


//FilterSearch
app.post('/filter', function(req, res, next){
  console.log("=====Recieved request for filtered list");
  if(req.body){
    console.log("body: ", req.body);
    var filtered = db.collection('cats');
    if(req.body.sex != "No preference"){
      if(req.body.age != "No preference"){
        if(req.body.cuddle != "No preference"){
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
          else{
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
        }
        else{
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
          else{
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, sex: req.body.sex, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, sex: req.body.sex, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, sex: req.body.sex, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, sex: req.body.sex, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
        }
      }
      else{
        if(req.body.cuddle != "No preference"){
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              filtered = filtered.find({sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{
              filtered = filtered.find({sex: req.body.sex, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
          else{
            if(req.body.coat != "No preference"){
              filtered = filtered.find({sex: req.body.sex, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{
              filtered = filtered.find({sex: req.body.sex, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
        }
        else{
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              filtered = filtered.find({sex: req.body.sex, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{                
              filtered = filtered.find({sex: req.body.sex, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
          else{
            if(req.body.coat != "No preference"){
              filtered = filtered.find({sex: req.body.sex, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{                
              filtered = filtered.find({sex: req.body.sex, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
        }
      }
    }
    else{
      if(req.body.age != "No preference"){
        if(req.body.cuddle != "No preference"){
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
          else{
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
        }
        else{
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
          else{
            if(req.body.coat != "No preference"){
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
            else{
              if(req.body.age == 1){
                filtered = filtered.find({age: {$lte: 1}, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 4){
                filtered = filtered.find({age: {$gte: 2}, age: {$lte: 5}, chonk: req.body.chonk, pets: req.body.pets});
              }
              else if(req.body.age == 7){
                filtered = filtered.find({age: {$gte: 6}, age: {$lte: 9}, chonk: req.body.chonk, pets: req.body.pets});
              }
              else{
                filtered = filtered.find({age: {$gte:10}, chonk: req.body.chonk, pets: req.body.pets});
              }
            }
          }
        }
      }
      else{
        if(req.body.cuddle != "No preference"){
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              filtered = filtered.find({cuddle: req.body.cuddle, play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{
              filtered = filtered.find({cuddle: req.body.cuddle, play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
          else{
            if(req.body.coat != "No preference"){
              filtered = filtered.find({cuddle: req.body.cuddle, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{
              filtered = filtered.find({cuddle: req.body.cuddle, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
        }
        else{
          if(req.body.play != "No preference"){
            if(req.body.coat != "No preference"){
              filtered = filtered.find({play: req.body.play, coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{                
              filtered = filtered.find({play: req.body.play, chonk: req.body.chonk, pets: req.body.pets});
            }
          }
          else{
            if(req.body.coat != "No preference"){
              filtered = filtered.find({coat: req.body.coat, chonk: req.body.chonk, pets: req.body.pets});
            }
            else{                
              filtered = filtered.find({chonk: req.body.chonk, pets: req.body.pets});
            }
          }
        }
      }
    }
    filtered.toArray(function (err, filteredcats) {
      if (err) {
        res.status(500).send({
          error: "Oh, no! The Sith have attacked the Database! Call the Jedi, quick!"
        });
      } 
      else if (filteredcats.length) {
        console.log("Here's the final array of cats ", filteredcats);
        var filteredKittens = {
          filteredKittens: filteredcats
        }
        res.status(200).send(filteredKittens);
      }
      else{
        res.status(400).send({
          error: "Oh, no! There are no cats that match your search!"
        });
        console.log('==array is empty');
        next();
      }
    });
  }
});

//style sheet
app.get('*/style.css', function(req, res, next) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'style.css'));
});

//interactive java
app.get('*/index.js', function(req, res, next) {
    res.status(200).sendFile(path.join(__dirname, 'public', 'index.js'));
});

//about us page
app.get('*/aboutus', function(req, res, next) {
    res.status(200).render('AboutUs');
});

//404 page
app.get('*', function(req, res, next) {
    res.status(404).render('404');
});

//Listener and database setup
MongoClient.connect(mongoUrl, function (err, client) {
    if (err) {
        throw err;
    }
    db = client.db(mongoDBName);
    app.listen(port, function(err) {
        if (err) {
            throw err;
        }
        console.log("== Server is listening on port", port);
    });
});

