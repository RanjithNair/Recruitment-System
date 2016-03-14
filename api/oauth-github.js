var github = require('octonode');
var express = require('express');
var request = require('request');
var qs = require('querystring');
var router = express.Router();

router.get('/github', function(req, res, next) {
  console.log(req.query.code);
  request.post(
    'https://github.com/login/oauth/access_token',
    { form: { client_id : '939bdd4b013f1c80c6e5', client_secret: '0572c8796736c855434cf227dec9cce8d2f07d0c', code: req.query.code, accept: 'json'} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var req_data = qs.parse(body)
            var client = github.client(req_data.access_token);
            var ghme = client.me();
            ghme.repos(function(error, body, headers){
              console.log(body);
              res.redirect('http://localhost:8080/#/github');
            });
        }
    }
);
});

module.exports = router;
