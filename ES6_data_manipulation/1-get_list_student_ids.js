const getListStudentIds = (liststudents) => {
    if (!Array.isArray(liststudents)) {
        return [];
    } else {
        const id = liststudents.map(liststudents => liststudents.id);
        return id;
    }
};

export default getListStudentIds;
