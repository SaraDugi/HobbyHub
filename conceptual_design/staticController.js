const fs = require('fs');
const path = require('path');

function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - Datoteka ni najdena.');
        } else {
            const ext = path.extname(filePath).toLowerCase();
            let contentType = 'application/octet-stream';

            if (ext === '.png') contentType = 'image/png';
            else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            else if (ext === '.gif') contentType = 'image/gif';
            else if (ext === '.html') contentType = 'text/html; charset=utf-8';
            else if (ext === '.txt') contentType = 'text/plain; charset=utf-8';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

module.exports = { serveStaticFile };