import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/members`;


// GET all members OR members by tree
const index = async (tree_id) => {
  try {
    const config = tree_id ? { 
          params: { tree_id },
          headers: {              
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        }
      : { headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' } };
    const response = await axios.get(BASE_URL, config);
    return response.data.member || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// GET one member
const show = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${memberId}`);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE member
const create = async (formData) => {
  try {
    
    const response = await axios.post(BASE_URL, formData);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// UPDATE member
const update = async (memberId, formData) => {
    try {
        const response = await axios.put(`${BASE_URL}/${memberId}`, formData , getAuthConfig());

        return response.data.member;
    } catch (error) {
        console.error(error);

    }
};

// DELETE member
const deleteOne = async (memberId, formData = {}) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${memberId}`, { ...getAuthConfig(), data: formData });
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
