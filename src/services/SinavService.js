import axios from 'axios';

//const SINAV_URL = "https://biga-aci-be.herokuapp.com/sinav/activeType";
const SINAV_URL = "http://localhost:8086/sinav/activeType";
class SinavService {

    getSinavTypes() {
        return axios.get(SINAV_URL);
    }

}

export default new SinavService ();