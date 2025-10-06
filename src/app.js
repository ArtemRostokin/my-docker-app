const http = require('http');
const port = process.env.PORT || 3000;

const createdAt = new Date();

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/db-test') {
    res.end('Database test endpoint - would connect to DB here');
  } else {
    res.end(`Hello World from Docker Compose! Started at ${createdAt.toISOString()}`);
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});