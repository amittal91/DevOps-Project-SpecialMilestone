var http = require('http'),
    httpProxy = require('http-proxy');

var fs = require("fs");
// var input = fs.readFileSync('./proxy_servers.json');

var redis = require('redis')
var input1 = fs.readFileSync('./redis_server.json');

var redis_ip;
var redis_port;

var url;

try {
    redisServer = JSON.parse(input1);
    redis_ip = redisServer.redis_ip;
    redis_port = redisServer.redis_port;
}
catch (err) {
    console.log('Error parsing redis_server.json');
    console.log(err);
}

var client = redis.createClient(redis_port, redis_ip, {})

//http proxy implementation
var pserver = http.createServer(function(req, res) {
    client.hgetall('production', function(err, iplist){
        // console.log(iplist)
        var value;
        var min = 101
        var ip = ""
        for(var ipvalue in iplist) {
            // console.log(ipvalue)
            value = iplist[ipvalue]
            if (value <= min) {
                min = value
                ip = ipvalue
            }
        }
        
        if (ip == "") {
            ip = "localhost"
        } 

        // console.log("IP: "+ip+"\t VALUE: "+min)
        url = "http://" + ip + ":3000"
        
        console.log("Delivering request to: ", url)
        var proxy = httpProxy.createProxyServer({target: url});
        proxy.web(req, res);
    
    })
});

pserver.listen(80, function() {
    console.log("proxy server listening on port 80")
});