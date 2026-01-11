import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/personalities`;

// GET ALL =================================================================================================
const index = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.personalities;
  } catch (error) {
    console.error(error);
  }
};

// GET ONE =================================================================================================
const show = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data.personality;
  } catch (error) {
    console.error(error);
  }
};

// CREATE ==================================================================================================
const create = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data.personality;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE ==================================================================================================
const update = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData);
    return response.data.personality;
  } catch (error) {
    console.error(error);
  }
};

// DELETE ==================================================================================================
const deleteOne = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
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
