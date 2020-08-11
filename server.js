const express = require('express');
let bodyParser = require('body-parser');
// let db = require("../database/db");
let app = express();

// array for each phhone
let hisham = [];
let mofareh = [];
let hanady = [];
let tahani = [];
let ali = [];
let hanan = [];
let test = [];


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


// a filter function so that only SMS from spacific senders will be added to array


/* list of institution in RIYADH

*** TEST ***
used for testing android app
test        : '+972123456789'
            : '+001-123456789'


*** BANKS ****
Alinma              : 'alinmabank'
Alahli              : 'AlahliSMS'
Riyadh              : 'RiyadhBank'
Alrajhi             : 'AlRajhiBank'
Arab NAtional Bank  : 'ANB'


*** GOVERNMENT INSTITUTIONS ***
Fasah                                           : 'FASAH'

General Authority of Zakat and Tax              : 'Gazt.gov.sa'
                                                : 'gazt.gov.sa'
                                            
General Organization for Social Insureance(GOSI): 'GOSI'

Ministry of Commerce                            : 'MC.GOV.SA'
                                                
Minestry of Interior                            : 'MOI.GOV.SA' 

Minestry of Justice                             : 'MOJ.GOV.SA'

Ministry of Municipal & Rural Affairs           : 'MOMRA'

MOROOR(Traffic)                                 : 'MOI-MOROOR'

Nafath                                          : 'IAM.GOV.SA'

Riyadh Chamber of commerce                      : 'RUH_Chamber'

Saudi Customs                                   : 'customs'

Saudi Post                                      : 'Saudi Post'


*** UTILITY COMPANIES ***
National Water Company                          : 'NWC'

Saudi Electricity Company (Alkahraba)           : 'ALKAHRABA'

Saudi Telecom Company (STC)                     : 'mystc'
                                                : 'stcbusiness'
*/

const lowerCaseAllowed = ['fasah', 'customs', 'mc.gov.sa', 'moi-moroor','nwc', 'anb', 'saudi post', 'moj.gov.sa', 'gazt.gov.sa', 'gosi', 'moi.gov.sa', 'iam.gov.sa', 'alinmabank', 'alahlisms', 'riyadhbank', 'alrajhibank', 'ruh_chamber', 'mystc', 'stcbusiness', 'alkahraba', 'momra', '+972123456789', '+001-123456789']

function codeFilter(smsToFilter) {  
  lowerCasePhone = smsToFilter.toLowerCase()
  console.log(lowerCasePhone);
  
  if (lowerCaseAllowed.includes(lowerCasePhone)) {
    return true
  }
}


// remove arrays if there are more than 10 elements
function removeOver10(array) {
  if (array.length > 10) {
    array.shift()
  } 
}


// add new message to array
function addToArray(array, newSMS){
  const timeStamp = Math.floor((new Date().getTime()/1000))
  console.log(timeStamp);
  
  const { phone, text } = newSMS;
  if (codeFilter(phone)) {
    array.push({ phone, text, timeStamp})
    console.log('new SMS added');
  } else {
    console.log('did not add SMS because filter');
  }
  removeOver10(array)
}


// server recive sms from phone
/* these are the routes used to recive sms and add them to server
name    : route

test    : /test
hisham  : /hisham
hanady  : /hanady
mofareh : /mofareh
tahani  : /tahani
ali     : /ali
hanan   : /hanan
*/


// post functhion to add JSON to array 
app.post('/test', (req, res) => {
  console.log('POST SMS');
  console.log(req.body);
  // add SMS to array
  addToArray(test, req.body)
  res.send('OK');
});


// adds hisham sms to array 
app.post('/hisham', (req, res) => {
  console.log('GET Hisham SMS');
  addToArray(hisham, req.body)
  res.send('OK');
});


// adds hanady sms to hanady array
app.post('/hanady', (req, res) => {
  console.log('GET Hanady SMS');
  addToArray(hanady, req.body)
  res.send('OK');
});


// adds mofareh sms to mofareh array
app.post('/mofareh', (req, res) => {
  console.log('GET Mofareh SMS');
  addToArray(mofareh, req.body)
  res.send('OK');
});


// adds tahani sms to array 
app.post('/tahani', (req, res) => {
  console.log('GET Tahani SMS');
  addToArray(tahani, req.body)
  res.send('OK');
});


// adds ali to sms array
app.post('/ali', (req, res) => {
  console.log('GET ali SMS');
  addToArray(ali, req.body)
  res.send('OK');
});


// adds hanan to sms array
app.post('/hanan', (req, res) => {
  console.log('GET hanan SMS');
  addToArray(hanan, req.body)
  res.send('OK');
});


/* api for user arrays */
/* api routes 
  name    : route

  test    : /testapi
  hisham  : /hishamapi
  hanady  : /hanadyapi
  mofareh : /mofarehapi
  tahani  : /tahaniapi
  ali     : /aliapi
  hanan   : /hananapi
 */


// test api
app.get('/testapi', (req, res) => {
  console.log('GET ALL SMS');
  console.log(test);
  res.send(test);
});


// prints all messsages in arrray
app.get('/hishamapi', (req, res) => {
  console.log('GET Hisham SMS');
  console.log(req.query);  
  res.send(hisham);
});


// prints all messsages in hanady array
app.get('/hanadyapi', (req, res) => {
  console.log('GET Hanady SMS');
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


// prints all messsages in ali array
app.get('/aliapi', (req, res) => {
  console.log('GET ali SMS');
  console.log(req.query);
  res.send(ali);
});


// prints all messsages in hanan array
app.get('/hananapi', (req, res) => {
  console.log('GET Hanan SMS');
  console.log(req.query);
  res.send(hanan);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});