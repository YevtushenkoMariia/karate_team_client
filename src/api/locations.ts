import api from "./axios";



export const getCities = async() => {

    const response = await   api.get("/api/location/cities");

    return response.data;
};

export const getClubs = async() => {

    const response = await  api.get("/api/location/clubs");

    return response.data;
};


