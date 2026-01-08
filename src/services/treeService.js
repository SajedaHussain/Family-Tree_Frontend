import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/trees`;

const index = async () => {
    try {
        const response = await axios.get(BASE_URL);
        console.log(response.data)
        return response.data.trees; 
    } catch (error) {
        console.error(error);
       
    }
};


const show = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data.tree; 
    } catch (error) {
        console.error(error);
      
    }
};


const create = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData);
        return response.data.tree;
    } catch (error) {
        console.error(error);
       
    }
};


const update = async (treeId, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${treeId}`, formData);
        return response.data.tree;
    } catch (error) {
        console.error(error);
       
    }
};

const deleteOne = async (treeId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${treeId}`);
        return response.data; 
    } catch (error) {
        console.error(error);
     
    }
};

export {
    index,
    show,
    create,
    update,
    deleteOne,
};
