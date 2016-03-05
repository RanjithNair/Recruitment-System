var ReactDOM = require('react-dom');
var React = require('react');
var App = require('./app.jsx');
var AUTH0_CLIENT_ID='FuS0vSfTdwwlNAp0fdreWZP1k08jL0qN'; 
var AUTH0_DOMAIN='infyrecruit.auth0.com'; 
var AUTH0_CALLBACK_URL=location.href;

ReactDOM.render(<App clientId={AUTH0_CLIENT_ID} domain={AUTH0_DOMAIN} />,
  document.getElementById('login-page'));
