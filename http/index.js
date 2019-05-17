const http = require('http');


const server = http.createServer(function (req, res) {
    console.log(req.url);
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('hello world');
    }
    else if(req.url === '/hello') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('hello');
        res.write('qwwwwwwwwwwwwwwww');
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('ERROR');
    }
});

server.listen(3000, '127.0.0.1');
