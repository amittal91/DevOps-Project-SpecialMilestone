var fs = require('fs')
var redis = require('redis')
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

// exec("dig +short myip.opendns.com @resolver1.opendns.com", puts)

var client = redis.createClient(redis_port, redis_ip, {})

var host_ip = process.argv[2]
var cpu_util = process.argv[3]
// console.log("IP: " + host_ip + "\t CPUUTIL: " + cpu_util)

client.hset('production', host_ip, cpu_util, function(err, res) {
    process.exit();
});

// client.lpop(host_ip, function(err, rep) {
//     client.lpush(host_ip, cpu_util, function (err1, rep1) {
//         process.exit();
//     });
// });