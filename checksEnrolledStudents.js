const connection = require('./connection');

async function checksEnrolledStudents(studentEnrollmentArray) {
  const studentsCheckEnrollment = [];

  studentEnrollmentArray.shift();

  for (const student of studentEnrollmentArray) {
    const studentStatus = await connection('FTC_ONE_APOIO_ESTUDANTE_REQUERIMENTO')
      .where('MATRICULA', student[1])
      .select('MATRICULA', 'EMAIL');

    if (studentStatus.length !== 0) {
      student.push(true);
    } else {
      const studentEmail = await connection('VW_VTC_EMAIL_MATRICULA')
      .where('MATRICULA', student[1].toString())
      .select('email');

      const email = studentEmail[0] == undefined ? 'Aluno sem e-mail' : studentEmail[0].email;
      student.push(false);
      student.push(email);
    }

    studentsCheckEnrollment.push(student);
  }
  
  const header = ['ORIGEM', 'MATRICULA', 'DISCENTE', 'PROBLEMA APRESENTADO', 'STATUS', 'EMAIL'];
  studentsCheckEnrollment.unshift(header);

  return studentsCheckEnrollment;
}

module.exports = checksEnrolledStudents;