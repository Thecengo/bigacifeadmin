import axios from 'axios';

//const SESSION_URL = "https://biga-aci-be.herokuapp.com/session/";
const SESSION_URL = "http://localhost:8086/session/";
class SessionService {

    getSessionsBySinavType(sinavType) {
        return axios.get(SESSION_URL, { params: { type: sinavType} });
    }

}

export default new SessionService ();