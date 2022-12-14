import axios from "axios";

class RestaurantDataService {
    // use get axios to make get request to the api on the back end
    getByDistance( x, y, distance, page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/distance?page=${page}&x=${x}&y=${y}&distance=${distance}`);
    }

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants?page=${page}`);
    }

    findPhoto(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/id/${id}/photo`);
    }

    find(query, by="name", page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants?${by}=${query}&page=${page}`
        );
    }

    findId(id) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/id/${id}`  
        );
    }

    findIds(ids){
        return Promise.all(ids.map(id=>this.findId(id)));
    }


    createReview(data) {
       return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/review`, data);
    }

    deleteReview(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/review`, {data});
    }
}
export default new RestaurantDataService();
