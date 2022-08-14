import axios from "axios";

class UserDataService {
    
    createUser(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/user`, data);
    }
    
    updateUser(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/user`, data);
    }

    deleteUser(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/user`, {data});
    }

    get(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/user/id/${id}`);
    }
}

export default new UserDataService();