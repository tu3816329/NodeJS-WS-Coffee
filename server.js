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
app.post('/webhook', function (request, response) {
//    console.log(request.body);
    var jsBody = JSON.parse(JSON.stringify(request.body));
    response.writeHeader(200, {'Content-type': "Application/json"});
    var content;
    if (jsBody.result.action.toString().toUpperCase() === "show_menu".toString().toUpperCase()) {
        var drinks = ["Goldenice", "Goldenice Jelly", "Goldenice with Cookies", "Goldenice Mocha", "Goldenice with Flavor", "Jelly Mint"];
        var prices = [45000, 49000, 49000, 49000, 49000, 49000];
        var display = "";
        for (var i = 0; i < drinks.length; i++) {
            display += "\n" + drinks[i].toString() + "         " + prices[i].toString();
        }
        var content = {'speech': 'Here s your menu.',
            'displayText': 'Here s your menu.' + display,
            'data': {}, 'contextOut': [], 'source': "Thien Tu", 'imageURL': 'https://image.freepik.com/free-vector/retro-menu_23-2147517653.jpg'};
    }
    ;
    response.write(JSON.stringify(content));
    console.log("Send response: " + JSON.stringify(content));
    response.end();
    console.log("POST");
});
//app.get('/', function (request, response) {
//    console.log("GET");
//    response.writeHeader(200, {'Content-Type': 'Text/Html'});
//    var content = "";
//    var ul = url.parse(request.url, true).query;
//    content += "<h1>Your name is " + ul.name + "</h1>";
//    response.write(content);
//    response.end();
//});
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





