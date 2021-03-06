var express = require('express');
var router = express.Router();
var fs = require('fs');
var AuthenticationClient = require('auth0').AuthenticationClient;
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJKVXBBTHlPTGtBcmFicGpXVklDTTBseXU5Nm0wN0s3NCIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiXX19LCJpYXQiOjE0NTcxMDU3NjQsImp0aSI6ImJjY2ExZTlmNzdjZGVjZjkzYWI1ZWFlMmFmNjYyMGJmIn0.T3v2Dlzl2C7RkiKs7rPlRJymAAEmJI_MjdiWEm3UuPM',
  domain: 'infyrecruit.auth0.com'
});

router.get('/tests', function(req, res, next) {
  management.users.getAll(function(err, users) {
    console.log(users.length);
  })
});

router.get('/interviewers', function(req, res, next) {
  var interviewerNameList = [];
  management.users.getAll(function(err, users) {
    if (users != null) {
      for (var ctr = 0; ctr < users.length; ctr++) {
        if (users[ctr].user_metadata != null && users[ctr].user_metadata.roles != null && users[ctr].user_metadata.roles[0] == 'interviewer') {
          interviewerNameList.push(users[ctr]);
        }
      }
      res.status(200).json(interviewerNameList);
    }
  });
});
module.exports = router;
