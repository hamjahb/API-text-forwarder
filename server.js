const express = require('express');
let bodyParser = require('body-parser');
// let db = require("../database/db");
let app = express();

// array for each phhone
let hisham = [];
let mofareh = []
let hanady = []
let tahani = []
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




// remove arrays if there are more than 10 elements
function removeOver10(array) {
  if (array.length > 10) {
    array.shift()
  } 
}


// add new message to array
function addToArray(array, newSMS){
  const { phone, text } = newSMS;
  array.push({ phone, text })
  console.log(newSMS + 'added to ' + array);
}


// server recive sms from phone
/* these are the routes used to recive sms and add them to server
name    : route

hisham  : /hisham
hanady  : /hanady
mofareh : /mofareh
tahani  : /tahani
*/

// post functhion to add JSON to array 
app.post('/test', (req, res) => {
  console.log('POST SMS');
  console.log(req.body);
  // add SMS to array
  addToArray(test, req.body)
  // remove arrays if there are more than 10 elements
  removeOver10(test)
  res.send('OK');
});


// adds hisham sms to array 
app.post('/hisham', (req, res) => {
  console.log('GET Hisham SMS');
  addToArray(hisham, req.body)
  removeOver10(hisham)
  res.send('OK');
});


// adds hanady sms to hanady array
app.post('/hanady', (req, res) => {
  console.log('GET Hanady SMS');
  addToArray(hanady, req.body)
  removeOver10(hanady)
  res.send('OK');
});


// adds mofareh sms to mofareh array
app.post('/mofareh', (req, res) => {
  console.log('GET Mofareh SMS');
  addToArray(mofareh, req.body)
  removeOver10(mofareh)
  res.send('OK');
});


// adds tahani sms to array 
app.post('/tahani', (req, res) => {
  console.log('GET Tahani SMS');
  addToArray(tahani, req.body)
  removeOver10(tahani)
  res.send('OK');
});


/* api for user arrays */
/* api routes 
  name    : route

  hisham  : /hishamapi
  hanady  : /hanadyapi
  mofareh : /mofarehapi
  tahani  : /tahaniapi
 */


// test api
app.get('/testapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(test);
  res.send(test);
});


// prints all messsages in arrray
app.get('/hishamapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);

  // this line is to just show number of sms in array
  // res.json('sms length: ' + array.length);
  
  res.send(hisham);
});


// prints all messsages in hanady array
app.get('/hanadyapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);
  res.send(hanady);
});


// prints all messsages in mofareh array
app.get('/mofarehapi', (req, res) => {
  console.log('GET Mofareh SMS');
  console.log(req.query);
  res.send(mofareh);
});


// prints all messsages in tahani array
app.get('/tahaniapi', (req, res) => {
  console.log('GET Tahani SMS');
  console.log(req.query);
  res.send(tahani);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', function() {
  console.log(`listening on port ${PORT}!`);
});