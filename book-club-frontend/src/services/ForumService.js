import axios from 'axios';

const REST_API_URL = "http://localhost:8080/api";

class ForumService {

    getForums() {
        return axios.get(REST_API_URL + "/forums");
    }
}

export default new ForumService()