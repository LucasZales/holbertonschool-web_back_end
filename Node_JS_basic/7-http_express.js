#!/usr/bin/node

const express = require('express');
const fs = require('fs');

const app = express();
const database = process.argv[2];

app.get('/', (req, res) => {
  res.type('text').send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  res.type('text');

  if (!database) {
    res.send('This is the list of our students\nCannot load the database');
    return;
  }

  fs.readFile(database, 'utf8', (error, data) => {
    if (error) {
      res.send('This is the list of our students\nCannot load the database');
      return;
    }

    const cleanData = data.split('\n').slice(1);
    const validStudents = cleanData
      .map((line) => line.trim())
      .filter((line) => line !== '');

    const studentsArray = validStudents.map((line) => line.split(','));
    const students = studentsArray.reduce((accumulator, student) => {
      const field = student[3];
      const firstname = student[0];

      if (accumulator[field]) {
        accumulator[field].push(firstname);
      } else {
        accumulator[field] = [firstname];
      }

      return accumulator;
    }, {});

    let output = `This is the list of our students\n`;
    output += `Number of students: ${studentsArray.length}\n`;

    Object.keys(students).forEach((field) => {
      output += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
    });

    res.send(output.trimEnd());
  });
});

app.listen(1245);

module.exports = app;
