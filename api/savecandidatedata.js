var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

router.post('/updateInterviewerData', function(req, res, next) {
  var url = 'mongodb://admin:infosys123@ds011419.mlab.com:11419/infyrecruitment';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      db.collection('users').updateOne(
        { "username" : req.body.username},
        {
          $set: { "interviewer" : req.body.interviewer}
        }, function(err, results) {
          if(err) {
            console.log(err);
          }
          console.log("Successfully updated");
          res.status(200).json(results);
        });
    }
  });
});

router.get('/getcandidatedata', function(req, res, next) {
  var url = 'mongodb://admin:infosys123@ds011419.mlab.com:11419/infyrecruitment';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('users', function(err, collection) {
        collection.find({}, {
          "username": 1
        }).toArray(function(err, items) {
          res.json(items);
        });
      });
    }
  });

});

router.get('/getcandidatedata/:id', function(req, res, next) {
  var o_id = new mongodb.ObjectID(req.params.id);
  var url = 'mongodb://admin:infosys123@ds011419.mlab.com:11419/infyrecruitment';

  // Use connect method to connect to the Server
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('users', function(err, collection) {
        collection.findOne({
          '_id': o_id
        }, function(err, docs) {
          res.json(docs);
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
      // do some work here with the database.
      var collection = db.collection('users');

      var user = {
        username: req.body.linkedin.name,
        linkedin: req.body.linkedin,
        githubprofile: req.body.githubprofile,
        githubrepo: req.body.githubrepo,
        codingfile: req.body.codingfile,
        resumefile: req.body.resumefile
      };
      collection.insert(user, function(err, result) {
        db.close();
        if (err) {
          console.log(err);
        } else {
          console.log("successfully inserted into db");
          res.status(200).json(user);
        }

      });

      //Close connection

    }
  });


})
module.exports = router;
