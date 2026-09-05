const getStudentsByLocation = (students, city) => {
    const student_ByLoc = students.filter(student => student.location === city);
    return student_ByLoc;
};

export default getStudentsByLocation;
