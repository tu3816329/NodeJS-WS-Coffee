/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
var url = require('url');
var sQuerry = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/', function (request, response) {
//    console.log(request.body);
    var jsBody = JSON.parse(JSON.stringify(request.body));
    var data = jsBody.result.parameters.Amount;
    console.log("-----------------------------------------------");
    console.log(data);
    response.writeHeader(200, {'Content-type': "Application/json"});
    var content = {'speech': 'Please wait a moment for your order.',
        'displayText': 'Please wait a moment for your order.We are making it!',
        'data': {}, 'contextOut': [], 'source': "Thien Tu"};
    response.write(JSON.stringify(content));
    console.log("Send response: " + JSON.stringify(content));
    response.end();
    console.log("POST");
});
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('listening on ' + server.address().port);
});
//var server = http.createServer(function (request, response) {
//    if (request.method === "GET") {
//        console.log("GET");
//        response.writeHeader(200, {'Content-Type': 'Text/Html'});
//        var content = "";
//        var ul = url.parse(request.url, true).query;
//        content += "<h1>Your name is " + ul.name + "</h1>";
//        response.write(content);
//        response.end();
//    } else if (request.method === "POST") {
//        response.writeHeader(200, {'Content-type': "Application/json"});      
//        var content = {'speech': 'Please wait a moment for your order.', 'displayText': 'Please wait a moment for your order.We are making it!', 'data': {}, 'contextOut': [], 'source': "Thien Tu"};
//        response.write(JSON.stringify(content));
//        console.log("Send response: " + JSON.stringify(content));
//        response.end();
//        console.log("POST");
//    }
//}).listen(process.env.PORT || 8080, function () {
//    console.log('listening on ' + server.address().port);
//});





