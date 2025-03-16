const http = require('http');
const { port } = require('./config');
const handleRequest = require('./routes');

const server = http.createServer((req, res) => {
  console.log(`Received request: ${req.url}`);
  handleRequest(req, res);
});

server.listen(port, () => {
  console.log(`Strežnik teče na http://localhost:${port}/`);
});