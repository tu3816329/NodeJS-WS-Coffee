/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var express = require('express');
//var fs = require('fs');
//var app = express();
//app.use(express.bodyParser());
//app.post('/', function (request, response) {
//    Console.log(request.body.name);
//    response.writeHead(200, {'Content-Type': 'Application/Json'});
//    response.end();
//});
var http = require('http');
var url = require('url');
var server = http.createServer(function (request, response) {
    if (request.method === "GET") {
        console.log("GET");
        response.writeHeader(200, {'Content-Type': 'Text/Html'});
        var content = "";
//        var name = request.body;
        var ul = url.parse(request.url, true).query;
//        var query = url.parse(request.url, true).query;
//        content += "<h1>Name is " + body + "</h1>";
        content += "<h1>Your name is " + ul.name + "</h1>";
        response.write(content);
        response.end();
    } else if (request.method === "POST") {
        console.log("POST");
    }
}).listen(8080);
//server.listen(8080);



