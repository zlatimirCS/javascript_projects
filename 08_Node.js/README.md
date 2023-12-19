Node.js

const http = require('http');
const server = http.createServer((req, res) => {
console.log(req.url);
console.log(req.method);
console.log(req.headers);
});
server.listen(3000, () => { console.log('server start'); });
// we need to visit localhost:3000 on our browser to see the console.log(req)
—-----------------------------------------------------
const server = http.createServer((req, res) => {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>Node.js</title></head>');
res.write('<body><h1>Hello Node.js</h1></body>');
res.write('</html>');
res.end();
});
// we need to visit localhost:3000
—-----------------------------------------------------
const server = http.createServer((req, res) => {
// set header type json
res.setHeader('Content-Type', 'application/json');
// set response
const data = {
name: 'John',
age: 30,
job: 'programmer'
};
// send response
res.end(JSON.stringify(data));
});
—-----------------------------------------------------
const server = http.createServer((req, res) => {
const url = req.url;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>Node.js</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
res.write('</html>');
return res.end();
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>Node.js</title></head>');
res.write('<body><h1>Hello Node.js</h1></body>');
res.write('</html>');
res.end();
});
—-----------------------------------------------------
const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
res.write('</html>');
return res.end();
}
if (url === '/message' && method === 'POST') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from message js</body>')
res.write('</html>');
return res.end();
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from node js</body>')
res.write('</html>');
res.end();
})
—-----------------------------------------------------
const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
res.write('</html>');
return res.end();
}
if (url === '/message' && method === 'POST') {
fs.writeFileSync('message.txt', 'dummy text');
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from node js</body>')
res.write('</html>');
res.end();
})

—-----------------------------------------------------
const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
res.write('</html>');
return res.end();
}
if (url === '/message' && method === 'POST') {
const body = [];
// event listener
req.on('data', (chunk) => {
body.push(chunk);
});
req.on('end', () => {
const parsedBody = Buffer.concat(body).toString();
const message = parsedBody.split('=')[1];
fs.writeFileSync('message.txt', message);
})
return res.end();
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from node js</body>')
res.write('</html>');
res.end();
})
—-----------------------------------------------------
const server = http.createServer((req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
res.write('</html>');
return res.end();
}
if (url === '/message' && method === 'POST') {
const body = [];
// event listener
req.on('data', (chunk) => {
body.push(chunk);
});
return req.on('end', () => {
const parsedBody = Buffer.concat(body).toString();
const message = parsedBody.split('=')[1];
fs.writeFile('message.txt', message, err => {
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
});
})
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from node js</body>')
res.write('</html>');
res.end();
})
—-----------------------------------------------------

Adding req, res logic to another file called routes, exporting it, and importing in app.js
const routes = require('./routes');
const server = http.createServer(routes);

routes.js
const fs = require('fs');

const requestHandler = (req, res) => {
const url = req.url;
const method = req.method;
if (url === '/') {
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body><form action="/message" method="POST"><input type="text" name="name"><button type="submit">Send</button></body>')
res.write('</html>');
return res.end();
}
if (url === '/message' && method === 'POST') {
const body = [];
// event listener
req.on('data', (chunk) => {
body.push(chunk);
});
return req.on('end', () => {
const parsedBody = Buffer.concat(body).toString();
const message = parsedBody.split('=')[1];
fs.writeFile('message.txt', message, err => {
res.statusCode = 302;
res.setHeader('Location', '/');
return res.end();
});
})
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>This is header</title></head>');
res.write('<body>Helo from node js</body>')
res.write('</html>');
res.end();
}

module.exports = requestHandler;

Or export as an Object
module.exports = {
handler: requestHandler,
somethingElse: 'some hard coded text'
};
And use it
const server = http.createServer(routes.handler);
—-----------------------------------------------------

—-----------------------------------------------------
npm init
—-----------------------------------------------------
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node app.js",
"start-server": "node app.js"
},

Here we can run: npm start
cant run npm start-server … (because start is reserved and can go without run.)
Our own created scripts must go with npm run
—-----------------------------------------------------
Npm install nodemon –save-dev
"nodemon": "^3.0.2" – ^ means - after running npm install, it will automatically pick later version if available.
"start": "nodemon app.js",
—-----------------------------------------------------
Npm install express –save
const express = require('express');
const app = express();
—-----------------------------------------------------
// we use next() function to travel to next middleware
const http = require('http');
const express = require('express');
const app = express();
app.use((req, res, next) => {
console.log('first middleware');
next();
});
app.use((req, res, next) => {
console.log('second middleware');
});
const server = http.createServer(app);
server.listen(3000, () => { console.log('server start'); });
—-----------------------------------------------------
// we can use res.send, express handle setHeader for us
const http = require('http');
const express = require('express');
const app = express();
app.use((req, res, next) => {
console.log('first middleware');
next();
});
app.use((req, res, next) => {
console.log('second middleware');
res.send('<h1>Hello Express</h1>');
});
const server = http.createServer(app);
server.listen(3000, () => { console.log('server start'); });
—-----------------------------------------------------
