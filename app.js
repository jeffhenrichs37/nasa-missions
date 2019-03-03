const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

//Connection URl
const url = 'mongodb://Nick:SecWorkshop2@ds133202.mlab.com:33202/nasa-missions';

const database = 'nasa-missions';

MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log(err);
    }

    const db = client.db(database);

    //Retriveing information from an api
    app.get('/', (req, res) => {
      res.status(200).json({message: "Welcome to the NASA missions api"});
    });

    app.get('/missions', (req, res) => {
      //Collection is a body of files
      db.collection('missions')
        .find()
        .toArray(function(err, doc){
          if (err) {
            console.error(err);

            //Server failed
            res.status(500).json({message: "Houston we have a problem"})
          } else {
            //Server Success
            res.status(200).json(doc);
          }
        });
    });


    app.listen('9001', () => {
      console.log('This port is over 9000!')
    });

    app.post('/missions', (req, res) => {
    const mission = req.body;
      db.collection('/missions')
        .insert(mission,
          function(err, result) {
            if (err) {
              console.error(err);
              res.status(500).json({message: "You done goofed up."});

            }else{
              res.status(200).json(result);
            }
          })
    })
})
