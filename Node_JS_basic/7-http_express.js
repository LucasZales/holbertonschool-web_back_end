const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const database = process.argv[2];
  const countStudents = ((database) => {
    const promise = new Promise((resolve, reject) => {
      fs.readFile(database, 'utf-8', (error, data) => {
        if (error) {
          reject(new Error('Cannot load the database'));
        } else {
          const cleanData = data
            .split('\n').slice(1)
            .map((value) => value.trim())
            .filter((value) => value !== '')
            .map((value) => value.split(','));
          const students = cleanData.reduce((accumulator, student) => {
            if (accumulator[student[3]]) {
              accumulator[student[3]].push(student[0]);
            } else {
              accumulator[student[3]] = [student[0]];
            }
            return accumulator;
          }, {});

          let output = `Number of students: ${cleanData.length}\n`;
          const keys = Object.keys(students);
          keys.forEach((key) => {
            const studentsCount = students[key].length;
            output += `Number of students in ${key}: ${studentsCount}. List: ${students[key].join(', ')}\n`;
          });

          resolve(output);
        }
      });
    });
    return promise;
  });
  countStudents(database)
    .then((result) => {
      res.send(`This is the list of our students\n${result}`);
    })
    .catch((error) => {
      res.send(`This is the list of our students\n${error.message}`);
    });
});

app.listen(port);
module.exports = app;
