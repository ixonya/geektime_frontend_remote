let http = require('http');
let archiver = require('archiver');

let request = http.request({
    hostname: '127.0.0.1',
    port: 8082,
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream'
    }
}, response => {
    console.log(response);
});

const archive = archiver('zip', {
    zlib: {
        level: 9
    }
});

archive.directory('./sample/', false);
archive.finalize();
archive.on('end', () => {
    request.end();
});
archive.pipe(request);