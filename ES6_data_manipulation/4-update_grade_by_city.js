const updateStudentGradeByCity = (students, city, newGrades) => {
    const studentsByCity = students.filter(
        (student) => student.location === city
    );

    const updatedStudents = studentsByCity.map((student) => {
        const grade = newGrades.find(
            (newGrade) => newGrade.studentId === student.id
        );

        return {
            ...student,
            grade: grade ? grade.grade : 'N/A',
        };
    });

    return updatedStudents;
};

export default updateStudentGradeByCity;
