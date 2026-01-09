import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/members`;

// إذا تحتاج الـ token لاحقاً
const getAuthConfig = (tree_id, code) => ({
  headers: { "Content-Type": "application/json" },
  data: { tree_id, code },
});

// GET all members OR by tree
const index = async (tree_id) => {
  try {
    const config = tree_id ? { params: { tree_id } } : {};
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
const update = async (memberId, formData, tree_id, code) => {
  try {
    const response = await axios.put(`${BASE_URL}/${memberId}`, formData, getAuthConfig(tree_id, code));
    return response.data.member;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE member
const deleteOne = async (memberId, tree_id, code) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${memberId}/${tree_id}?code=${code}`);
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
