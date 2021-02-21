import axios from 'axios';

//const STUDENT_URL = "https://biga-aci-be.herokuapp.com/student";
const STUDENT_URL = "http://localhost:8086/student";
class StudentService {

    createStudents(student) {
        return axios.post(STUDENT_URL, student);
    }
    
    getStutudentsBySinavTypeAndSessionStartTime(type, startTime) {
        let url = STUDENT_URL.concat('/applied');
        return axios.get(url, { params: { tip: type, startTime:startTime } });
    }

}

export default new StudentService();