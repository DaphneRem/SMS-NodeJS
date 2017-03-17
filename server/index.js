'use strict';

const express = require('express');
const app = express();
const server = app.listen(4000);

const bodyParser = require('body-parser');
const ejs = require('ejs');

var fs = require("fs");
var vm = require('vm');

vm.runInThisContext(fs.readFileSync(__dirname + "/key.js")); // on importe les variables keyApi, secretApi et myNumber de key.js



const Nexmo = require('nexmo');
const nexmo = new Nexmo({
  apiKey: keyApi,
  apiSecret: secretApi,
}, {debug: true});

app.set('views', __dirname + '/../views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});


app.post('/', (req, res) => {
    res.send(req.body);
    console.log(req.body);

    let toNumber = req.body.number;
    let text = req.body.text;

    nexmo.message.sendSms(
      myNumber, toNumber, text, {type: 'unicode'},
      (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
          // Optional: add socket.io -- will explain later
        }
      }
    );
});
