import axios from "axios";

// createCollection(data) {
//     return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections`, data);
// }
class AuthDataService {
    login(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/login`, data)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/register`, data);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthDataService();