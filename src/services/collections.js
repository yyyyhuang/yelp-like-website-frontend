import axios from "axios";

class CollectionDataService {
    
    createCollection(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections`, data);
    }
    
    updateCollection(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections`, data);
    }

    deleteCollection(data) {
        return axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections`, {data});
    }
    
    get(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections/${id}`);
    }

    getCollection(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/restaurants/collections/id/${id}`);
    }
}

export default new CollectionDataService();