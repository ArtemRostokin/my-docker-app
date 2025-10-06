const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  
  try {
    if (req.url === '/logs') {
      let output = '=== LOG VIEWER ===\n\n';
      
      // Читаем логи из volumes через mounted directories
      const logDirs = [
        '/logs/server-1',
        '/logs/server-2', 
        '/logs/server-3',
        '/logs/server-4'
      ];
      
      for (const logDir of logDirs) {
        if (fs.existsSync(logDir)) {
          const files = fs.readdirSync(logDir);
          for (const file of files) {
            if (file.endsWith('.log')) {
              const filePath = path.join(logDir, file);
              const stats = fs.statSync(filePath);
              const content = fs.readFileSync(filePath, 'utf8');
              const lines = content.trim().split('\n');
              const lastLines = lines.slice(-5); // Последние 5 строк
              
              output += `--- ${file} (${stats.size} bytes) ---\n`;
              output += lastLines.join('\n') + '\n\n';
            }
          }
        }
      }
      
      res.end(output || 'No logs found');
    } else {
      res.end('Log Viewer Service\nUse /logs endpoint to view logs');
    }
  } catch (error) {
    res.statusCode = 500;
    res.end(`Error: ${error.message}`);
  }
});

server.listen(port, () => {
  console.log(`Log viewer running at http://localhost:${port}/`);
});