const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (error) => {
        console.log(error);
    }).on('data', (chunk) => {        
        console.log('chunk: ', chunk.toString());
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body: ', body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(' Hello world');
    });
}).listen(9494);

console.log('Server started.');