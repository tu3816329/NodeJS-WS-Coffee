/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//var api = require('api-ai');
//var pg = require('pg');
//app.set('port', process.env.PORT || 3000);
//------------------------------------------------
//var SELECT_BY_PRODUCT_NAME_QUERY
var SELECT_ALL_DETAIL_QUERY = "Select a.name,a.price,a.FoodType,b.name from ( select a.name,a.price,b.name as FoodType,b.product_type_id from tbl_product a INNER JOIN tbl_DetailProductType b ON a.Type_id=b.id ) a INNER JOIN tbl_ProductType b ON a.product_type_id=b.id";
var SELECT_BY_PRICE_QUERY = "select b.name as Product,a.name,a.Type_Name as type,a.price from tbl_producttype b, ( select a.name,a.price,b.name as Type_Name,b.product_type_id from tbl_product  a inner join tbl_detailproducttype b  ON a.type_id=b.id where a.price=$1 ) a where a.product_type_id=b.id ";
var SELECT_PRODUCT_TYPE_QUERY = "Select name From tbl_ProductType";
var SELECT_BY_PRODUCT_TYPE_QUERY = "Select name From tbl_ProductType";
var http = require('http');
var url = require('url');
var sQuerry = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var option = {
    disconnect: function (client, dc) {
        var cp = client.connectionParameters;
        console.log("Disconnecting from database ", cp.database);
    }
};
var pgPromise = require('pg-promise')(option);
var app = express();
//-------------Connection Config For OnlineDB------------------------
/* 
 var conConfig = {
 host: '',
 port: 5432,
 database: '',
 user: '',
 password: '',
 ssl: true,
 poolSize: 20
 };
 var db=pgPromise(conConfig);
 */
//-------------Connection Config For Offline DB------------------------
var conString = "postgres://postgres:tu3816329@localhost:5432" + "/CoffeeShop";
var db = pgPromise(conString);
//------------------------------------------------------------------
module.exports = db;
module.exports = pgPromise;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//------------------SupportFunction-----------------------------------------
function getProductTypeID(name) {
    return db.oneOrNone(SELECT_PRODUCT_TYPE_QUERY + " Where name=$1", name).then(function (row) {
        return row;
    });
}

//------------------Handle Post Request--------------------------------------
app.post('/webhook', function (request, response) {
//    console.log(request.body);
    var jsBody = request.body;
    response.writeHeader(200, {'Content-type': "Application/json"});
    var content;
    //----------------------Handle Show Menu Request-------------------------
    if (jsBody.result.action.toString().toUpperCase() === "show_menu".toString().toUpperCase()) {
        if (jsBody.result.parameters.Type != "") {
            var id = getProductTypeID(jsBody.result.parameters.Type.toString());
            if (id != null) {
                db.many(SELECT_ALL_DETAIL_QUERY).then(function (row) {
                    var display = "";
                    var speech = "Here s your menu";
                    var text = speech;
                    var content = {'speech': speech,
                        'displayText': text,
                        'data': row,
                        'contextOut': [], 'source': "Thien Tu", 'followupEvent': {
                        }
                    };
                    response.write(JSON.stringify(content));
                    console.log("Send response: " + JSON.stringify(content));
                    response.end();
                }).catch(function (error) {
                    if (error)
                        throw error;
                });
            }

        }

    }
});
//---------------------Handle get request --------------------------
app.get('/', function (request, response) {
    console.log("Connecting to DB.........");
    var content = "";
    db.many(GET_PRODUCT_TYPE_QUERY).then(function (row) {
        var productType = [];
        for (var i = 0; i < row.length; i++) {
            productType.push({"name": row[i].name.toString()});
        }
        for (var j = 0; j < productType.length; j++) {
            content += productType[j].name + '\n';
        }
        response.writeHeader(200, {'Content-type': "text/html"});
        response.write("Result: \n" + content);
        response.end();
    }).catch(function (error) {
        if (error)
            throw error;
    });
}
);
//----------------------Post Server----------------------------------
var server = app.listen(process.env.PORT || 8080, function () {
    console.log('listening on ' + server.address().port);
});
//------------------PG code---------------------------------------------
/*
 var client = pg.Client(conString);
 pg.defaults.ssl = true;
 pg.defaults.poolSize = 25;
 pg.connect(conString, function (error, client) {
 if (error)
 throw error;
 var query = client.query('Select * From tbl_Drinks;');
 query.on('row', function (row) {
 content += JSON.stringify(row).toLocaleString() + "/n";
 console.log(JSON.stringify(row));
 });
 query.on('end', function () {
 console.log("Client was disconnected.");
 client.end();
 });
 });
 app.get('/', function (request, response) {
 console.log("GET");
 response.writeHeader(200, {'Content-Type': 'Text/Html'});
 var content = "";
 var ul = url.parse(request.url, true).query;
 content += "<h1>Your name is " + ul.name + "</h1>";
 response.write(content);
 response.end();
 });
 var server = http.createServer(function (request, response) {
 if (request.method === "GET") {
 console.log("GET");
 response.writeHeader(200, {'Content-Type': 'Text/Html'});
 var content = "";
 var ul = url.parse(request.url, true).query;
 content += "<h1>Your name is " + ul.name + "</h1>";
 response.write(content);
 response.end();
 } else if (request.method === "POST") {
 response.writeHeader(200, {'Content-type': "Application/json"});      
 var content = {'speech': 'Please wait a moment for your order.', 'displayText': 'Please wait a moment for your order.We are making it!', 'data': {}, 'contextOut': [], 'source': "Thien Tu"};
 response.write(JSON.stringify(content));
 console.log("Send response: " + JSON.stringify(content));
 response.end();
 console.log("POST");
 }
 }).listen(process.env.PORT || 8080, function () {
 console.log('listening on ' + server.address().port);
 });
 
 */

