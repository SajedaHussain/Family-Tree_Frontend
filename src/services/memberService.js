import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/member`;

const index = async () => {
    try {
        const config = tree_id ? { params: { tree_id: tree_id } } : {};
        const response = await axios.get(BASE_URL, config);
        return response.data.member;
    } catch (error) {
        console.error(error);
        
    }
};

const show = async (memberId) => {
    try {
        const response = await axios.get(`${BASE_URL}/${memberId}`);
        return response.data.member;
    } catch (error) {
        console.error(error);
        throw error
    }
};

const create = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData);
        return response.data.member;
    } catch (error) {
        console.error(error);
       
    }
};

const update = async (memberId, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${memberId}`, formData);
        return response.data.member;
    } catch (error) {
        console.error(error);
       
    }
};

const deleteOne = async (memberId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${memberId}`);
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
