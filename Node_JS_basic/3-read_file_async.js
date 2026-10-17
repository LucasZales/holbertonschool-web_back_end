#!/usr/bin/node

const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data.trim().split('\n');
      const students = lines.slice(1).filter((line) => line.trim() !== '');
      const fields = {};

      console.log(`Number of students: ${students.length}`);

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
        console.log(
          `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`,
        );
      });

      resolve();
    });
  });
}

module.exports = countStudents;
