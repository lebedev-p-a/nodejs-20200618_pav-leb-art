const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
    const pathname = url.parse(req.url).pathname.slice(1);
    const filepath = path.join(__dirname, 'files', pathname);

    if(path.dirname(pathname) !== '.') {
      res.statusCode = 400;
      res.end('Nested folders are not supported.');
    }

    switch (req.method) {
      case 'GET':
        fs.readFile(filepath, (err, data) => {
          if (err) {
            res.statusCode =  err.code === 'ENOENT' ? 404 : 500;
            res.end();
            return;
          }
          res.end(data);
        })
        break;

      default:
        res.statusCode = 501;
        res.end('Not implemented');
    }
  });

module.exports = server;