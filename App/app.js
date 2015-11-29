var express = require('express');
var app = express();
var redis = require('redis')
var fs = require('fs')

var input = fs.readFileSync('./redis_server.json');

var redis_ip;
var redis_port;

try {
    redisServer = JSON.parse(input);
    redis_ip = redisServer.redis_ip;
    redis_port = redisServer.redis_port;
}
catch (err) {
    console.log('Error parsing redis_server.json');
    console.log(err);
}

var client = redis.createClient(redis_port, redis_ip, {})

// or more concisely
var sys = require('sys')
var exec = require('child_process').exec;
var host_ip = ""
function puts(error, stdout, stderr) { 
    host_ip = stdout.replace(/\n$/,'')
    client.lpush('prod_queue',host_ip)
    client.set(host_ip,'')
    }
exec("dig +short myip.opendns.com @resolver1.opendns.com", puts)

app.get('/', function (req, res) {
  res.send('Hello everyone! This is a very basic app for Milestone 3');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});