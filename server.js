const http = require('http');
// to create a server we need a listener 
const app = require('./app');

// process.env is node.js environment variable PORT 
// if we diploy it on a server but for now we are using 5000 
const port = process.env.PORT || 5000;
// this is excuted when ever we got a request
const server = http.createServer(app);
// will listen to this port 
server.listen(port);