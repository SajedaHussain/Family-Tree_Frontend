import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/members`;

// إذا تحتاج الـ token لاحقاً
const getAuthConfig = (treeId, code) => ({
  headers: { "Content-Type": "application/json" },
  data: { treeId, code },
});

// GET ALL =================================================================================================
const index = async (treeId) => {
  try {
    const config = treeId ? { params: { treeId } } : {};
    const response = await axios.get(BASE_URL, config);
    return response.data.member || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// GET ONE =================================================================================================
const show = async (memberId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${memberId}`);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE ==================================================================================================
const create = async (formData) => {
  try {
    const response = await axios.post(BASE_URL, formData);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// UPDATE =================================================================================================
const update = async (memberId, formData, treeId, code) => {
  try {
    const response = await axios.put(`${BASE_URL}/${memberId}`, formData, getAuthConfig(treeId, code));
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE =================================================================================================
const deleteOne = async (memberId, code , treeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${memberId}/${treeId}?code=${code}`);
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { 
  index,
  show, 
  create, 
  update, 
  deleteOne };
