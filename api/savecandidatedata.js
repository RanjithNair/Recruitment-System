var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;




router.get('/getcandidatedata', function(req, res, next) {
  var url = 'mongodb://admin:infosys123@ds011419.mlab.com:11419/infyrecruitment';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
          res.json(items);
        });
      });
    }
  });

});




router.post('/savecandidatedata', function(req, res, next) {
  var url = 'mongodb://admin:infosys123@ds011419.mlab.com:11419/infyrecruitment';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);
      console.log(req.body.githubprofile);
      // do some work here with the database.
      var collection = db.collection('users');

      var user = {
        linkedin: req.body.linkedin,
        githubprofile: req.body.githubprofile,
        githubrepo: req.body.githubrepo,
        codingfile: req.body.codingfile,
        resumefile: req.body.resumefile
      };
      collection.insert(user, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("successfully inserted into db");
        }
        db.close();
      });

      //Close connection

    }
  });


})
module.exports = router;
