let http = require('http');
let unzipper = require('unzipper');

http.createServer(function(req, res) {
    let outStream = unzipper.Extract({
        path: '../server/public/'
    });
    req.pipe(outStream);
    req.on('end', () => {
        outStream.end();
        console.log('published !!');
        res.end("request received !");
    });    
}).listen(8082);