import axios from "axios";

class FavoriteDataService {
    updateFavorites(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, data);
    }
    
    getFavorites(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${id}`);
    }
    
}

export default new FavoriteDataService();