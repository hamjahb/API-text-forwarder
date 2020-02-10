const express = require('express');
let bodyParser = require('body-parser');
// let db = require("../database/db");
let app = express();

let array = [];
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


// post functhion to add JSON to array 
app.post('/', (req, res) => {
  console.log('POST SMS');
  console.log(req.query);
  const { phone, text } = req.query;
  array.push({ phone, text });
  res.send('OK sent');
});


// prints all messsages in arrray
app.get('/all', (req, res) => {
  console.log('GET ALL SMS');
  console.log(req.query);
  // const { phone, text } = req.query;
  // array.push({ phone, text });
  // res.json('sms length: ' + array.length);
  res.send('sms length: ' + array.length /n + array);
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', function() {
  console.log(`listening on port ${PORT}!`);
});