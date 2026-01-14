import axios from "axios";

const instance = axios.create({
    baseURL: 'https://food-fair-backend.vercel.app/api/', // Base URL for the API
    withCredentials: true,
    
});

const usePublicAxios = () => {
    return instance;
};

export default usePublicAxios;