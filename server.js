const express = require('express');
let bodyParser = require('body-parser');
// let db = require("../database/db");
let app = express();

// array for each phhone
let array = [];
let mofareh = []
let hanady = []
let test = []

// the problem was CORS origin and the request sent to port 3000 [Front-end port] not 5000 [Back-end port]
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// server recive sms from phone
/* these are the routes used to recive sms and add them to server
  name    : route

  hisham  : /
  hanady  : /hanady
  mofareh : /mofareh

  TO DO ****
  tahani  : /tahani
*/

// adds hisham sms to array 
app.get('/', (req, res) => {
  console.log('GET SMS');
  console.log(req.query);
  const { phone, text } = req.query;
  array.push({ phone, text });

  // remove arrays if there are more than 10 elements
  if (array.length > 10) {
    array.shift()
  }

  res.send('OK');
});

// adds hanady sms to hanady array
app.get('/hanady', (req, res) => {
  console.log('GET Hanady SMS');
  console.log(req.query);
  const { phone, text } = req.query;
  hanady.push({ phone, text });

  // remove arrays if there are more than 10 elements
  if (hanady.length > 10) {
    hanady.shift()
  }

  res.send('OK');
});


// adds mofareh sms to mofareh array
app.get('/mofareh', (req, res) => {
  console.log('GET MOFAREH SMS');
  console.log(req.query);
  const { phone, text } = req.query;
  mofareh.push({ phone, text });

  // remove arrays if there are more than 10 elements
  if (mofareh.length > 10) {
    mofareh.shift()
  }

  res.send('OK');
});


// post functhion to add JSON to array 
app.post('/test', (req, res) => {
  console.log('POST SMS');
  console.log(req.body);
  const { phone, text } = req.body;
  test.push({ phone, text });
  console.log(test);
  res.send('OK');
});


/* api for user arrays */
/* api routes 
  name    : route

  hisham  : /all
  hanady  : /hanadyapi
  mofareh : /mofarehapi


  TO DO ****
  tahani  : /tahaniapi

 */

// prints all messsages in arrray
app.get('/all', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);

  // this line is to just show number of sms in array
  // res.json('sms length: ' + array.length);
  
  res.send(array);
});

// prints all messsages in hanady array
app.get('/hanadyapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);
  res.send(hanady);
});

// prints all messsages in mofareh array
app.get('/mofarehapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);
  res.send(mofareh);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', function() {
  console.log(`listening on port ${PORT}!`);
});