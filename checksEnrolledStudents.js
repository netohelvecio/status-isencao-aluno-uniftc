const connection = require('./connection');

async function checksEnrolledStudents(studentEnrollmentArray) {
  const studentsCheckEnrollment = [];

  studentEnrollmentArray.shift();

  for (const student of studentEnrollmentArray) {
    const studentStatus = await connection('FTC_ONE_APOIO_ESTUDANTE_REQUERIMENTO')
      .where('MATRICULA', student[1])
      .select('MATRICULA', 'EMAIL');

    if (studentStatus.length !== 0) {
      student.push('Inscrito');
    } else {
      student.push('Não inscrito');
    }

    studentsCheckEnrollment.push(student);
  }
  
  const header = ['ORIGEM', 'MATRICULA', 'DISCENTE', 'PROBLEMA APRESENTADO', 'STATUS'];
  studentsCheckEnrollment.unshift(header);

  return studentsCheckEnrollment;
}

module.exports = checksEnrolledStudents;