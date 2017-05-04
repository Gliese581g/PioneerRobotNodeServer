var express = require("express");
var ip = require("ip");
var app = express();

var commandQueue = [];

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    if(commandQueue.length > 0){ res.end(commandQueue.shift()); }
    else{ res.end(''); }
});

app.get('/reset', function(req, res){
    commandQueue = [];
    res.sendStatus(200);
});

app.get('/:dir/:amount', function(req,res){
    var dir = req.params.dir.substring(1);
    var amount = req.params.amount.substring(1);
    if(parseInt(amount)){
        commandQueue.push(dir + "|" + amount);
    }else{
        commandQueue.push(dir + "|0");
    }
    res.sendStatus(200);
});

app.listen(app.get('port'));
