import axios from "axios";

class RestaurantDataService {
    // use get axios to make get request to the api on the back end
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants?page=${page}`);
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

    getRatings() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/ratings`);
    }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, data);
    }

    deleteReview(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/review`, {data});
    }
}
export default new RestaurantDataService();
