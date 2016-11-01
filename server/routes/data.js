var express = require('express');
var router = express.Router();
var passport = require('passport');
var creds = require('../modules/serviceaccount');

var colors = require('colors');
var util = require('util');

console.log(colors.magenta('Authenticating with Google Cloud...'));
var gcloud = require('google-cloud')({
    projectId: process.env.PROJECT_ID,
    credentials: creds
});

//var datastore = gcloud.datastore();
var pubsub = gcloud.pubsub();
var bigquery = gcloud.bigquery();

var pubsubsubscription = 'test_sub';

router.get('/', function (req, res) {

    // Access an existing dataset and table.
    var sunnyDataset = bigquery.dataset('test_set');
    var sunnyTable = sunnyDataset.table('test_table');

    var query = 'SELECT data, published_at FROM' +
        '[sunlights-147417:test_set.test_table]' +
        'LIMIT 10';
    var dataFromBigQuery = [];
    bigquery.createQueryStream(query)
        .on('error', console.error)
        .on('data', function (row) {
       
            dataFromBigQuery.push(
                {
                    x: row.published_at,
                    y: row.data
                }
            );

        })
        .on('end', function () {
            res.send(dataFromBigQuery);
        });

});


module.exports = router;