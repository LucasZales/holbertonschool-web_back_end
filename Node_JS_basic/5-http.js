const http = require('http');
const fs = require('fs');

const countStudents = (database) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(database, 'utf-8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const cleanData = data.split('\n').slice(1);
        const cleanValidStudents = cleanData.map((value) => value.trim());
        const validStudents = cleanValidStudents.filter((value) => value !== '');
        const studentsArray = validStudents.map((value) => value.split(','));
        const c = studentsArray.length;
        const students = studentsArray.reduce((accumulator, student) => {
          if (accumulator[student[3]]) {
            accumulator[student[3]].push(student[0]);
          } else {
            accumulator[student[3]] = [student[0]];
          }
          return accumulator;
        }, {});

        let output = `Number of students: ${c}\n`;
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
};

const app = http.createServer((request, response) => {
  response.writeHead(200, {
    'Content-type': 'text/plain',
  });

  if (request.url === '/') {
    response.write('Hello Holberton School!');
    response.end();
  } else if (request.url === '/students') {
    const database = process.argv[2];
    response.write('This is the list of our students\n');
    countStudents(database)
      .then((result) => {
        response.end(result.trim());
      })
      .catch((error) => {
        response.end(error.message);
      });
  } else {
    response.end('Hello Holberton School!');
  }
});

app.listen(1245);

module.exports = app;
