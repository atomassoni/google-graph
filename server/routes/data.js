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
// router.get('/', function (req, res) {

//     // Access an existing dataset and table.
//     var sunnyDataset = bigquery.dataset('test_set');
//     var sunnyTable = sunnyDataset.table('test_table');

//     // Import data into a table.
//     sunnyTable.import('bigquery.json', function (err, job) {
//         if (err) {
//             console.log(err);
//         }
//     });
// });


// var subscription = pubsub.subscription(pubsubsubscription);

// function storeEvent(message) {

//     var obj = [{
//         gc_pub_sub_id: message.id,
//         device_id: message.attributes.device_id,
//         event: message.attributes.event,
//         data: message.data.toString(),
//         published_at: message.attributes.published_at
//     }];
//     // Access an existing dataset and table.
//     var sunnyDataset = bigquery.dataset('test_set');
//     //console.log('ds', sunnyDataset);
//     var sunnyTable = sunnyDataset.table('test_table');
//     //console.log('dt', sunnyTable);

//     sunnyTable.insert(obj, function (err, insertErrors, apiResponse) {
//         if (err) {
//             console.log('error', err);
//         } else {
//             console.log('for insert', obj);
//             console.log(apiResponse);
//             console.log(insertErrors);
//         }
//     });

//     // //Promise... doesn't work
//     // sunnyTable.insert(obj).then(function (data) {
//     // 	var insertErrors = data[0];
//     // 	var apiResponse = data[1];
//     // 	console.log('data errors', data);
//     // });
// }

// subscription.on('message', function (message) {
//     console.log(colors.cyan('Particle event received from Pub/Sub!\r\n'), _createEventObjectForStorage(message, true));
//     // Called every time a message is received.
//     // message.id = ID used to acknowledge its receival.
//     // message.data = Contents of the message.
//     // message.attributes = Attributes of the message.
//     storeEvent(message);
//     message.ack();
// });

// function _createEventObjectForStorage(message, log) {
//     var obj = {
//         gc_pub_sub_id: message.id,
//         device_id: message.attributes.device_id,
//         event: message.attributes.event,
//         data: message.data.toString(),
//         published_at: message.attributes.published_at
//     };

//     if (log) {
//         return colors.grey(util.inspect(obj));
//     } else {
//         return obj;
//     }
// };


module.exports = router;