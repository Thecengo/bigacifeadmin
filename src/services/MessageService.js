import axios from 'axios';

const MESSAGE_URL = "https://biga-aci-be.herokuapp.com/message";
//const MESSAGE_URL = "http://localhost:8086/message/";

class MessageService {

    createMessage(message) {
        return axios.post(MESSAGE_URL, message);
    }
    getMessages() {
        return axios.get(MESSAGE_URL)
    }

}

export default new MessageService();