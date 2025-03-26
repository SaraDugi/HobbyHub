const url = require('url');          
const path = require('path');        
const fs = require('fs');
const { serveStaticFile } = require('./staticController');

const funkcionalnostiPath = path.join(__dirname, 'public', 'funkcionalnosti.html');
const posebnostiPath = path.join(__dirname, 'public', 'posebnosti.txt');

const funkcionalnostiHTML = fs.readFileSync(funkcionalnostiPath, 'utf8');
const posebnostiTekst = fs.readFileSync(posebnostiPath, 'utf8');

function extractFunkcionalnosti(html) {
    const regex = /<h3>(\d+\.\s(.*?)?)<\/h3>\s*<p><strong>Namen:<\/strong>\s*(.*?)<\/p>/g;
    const funkcionalnosti = [];
    
    let match;
    while ((match = regex.exec(html)) !== null) {
        funkcionalnosti.push({
            ime: match[2].trim(),
            namen: match[3].trim()
        });
    }
    return { funkcionalnosti };
}

const funkcionalnostiJSON = extractFunkcionalnosti(funkcionalnostiHTML);

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    switch (pathname) {
        case '/funkcionalnosti-odjemalca/':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(funkcionalnostiHTML);
            break;

        case '/posebnosti/':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(posebnostiTekst);
            break;

        default:
            if (pathname.startsWith('/images/')) {
                const filePath = path.join(__dirname, 'public', pathname);
                serveStaticFile(filePath, res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 - Vsebina ni najdena.');
            }
    }
};