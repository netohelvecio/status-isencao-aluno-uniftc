const xlsx = require('node-xlsx');
const fs = require('fs');
const checksEnrolledStudents = require('./checksEnrolledStudents');

const readFile = xlsx.parse(`${__dirname}/alunos-covid19.xlsx`)[0];

const removeArraysEmpyts = readFile.data.filter(array => array.length !== 0);

checksEnrolledStudents(removeArraysEmpyts).then(res => {
  const options = {'!cols': [{ wch: 10 }, { wch: 15 }, { wch: 50 }, { wch: 60 }, { wch: 18 }, { wch: 35 }]};

  const createFileExcel = xlsx.build(
    [{ name: 'Isenção covid-19', data: res }],
    options,
  );

  fs.writeFile(`tmp/alunosisenção${Date.now()}.xlsx`, createFileExcel, (err) => {
    if (err) throw err
    console.log('Arquivo criado na pasta tmp');
  });
});

