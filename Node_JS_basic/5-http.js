#!/usr/bin/node

const http = require('http');
const fs = require('fs');

const database = process.argv[2];

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    if (!database) {
      res.end('This is the list of our students\nCannot load the database');
      return;
    }

    fs.readFile(database, 'utf8', (error, data) => {
      if (error) {
        res.end('This is the list of our students\nCannot load the database');
        return;
      }

      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const fields = {};

      let output = `This is the list of our students\n`;
      output += `Number of students: ${students.length}\n`;

      students.forEach((student) => {
        const columns = student.split(',');
        const firstname = columns[0];
        const field = columns[3];

        if (!fields[field]) {
          fields[field] = [];
        }

        fields[field].push(firstname);
      });

      Object.keys(fields).forEach((field) => {
        output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
      });

      res.end(output.trimEnd());
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
