const fs = require("fs");
function getProxy(callback){
  fs.readFile('src/http_proxies.txt', "utf-8", function(err, data){
    if(err) {
        throw err;
    }
    var lines = data.split('\n');
    var line = lines[Math.floor(Math.random()*lines.length)]
    var ip_regex = new RegExp('(.*?):')
    var port_regex = new RegExp(':(.*)')
    var ip = line.match(ip_regex)[1]
    var port = line.match(port_regex)[1]
    callback(ip,port);
 })
}
function getAgent(callback){
  fs.readFile('src/user_agent.txt', "utf-8", function(err, data){
    if(err) {
        throw err;
    }
    var lines = data.split('\n');
    var line = lines[Math.floor(Math.random()*lines.length)]
    callback(line);
 })
}
module.exports = { getProxy,getAgent }

