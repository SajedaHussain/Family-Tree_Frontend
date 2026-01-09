import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/profiles`;

// Get profile of logged-in user
const getMyProfile = async () => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.profile;
  } catch (err) {
    console.error(err);
  }
};

// Create or update profile
const createOrUpdate = async (formData) => {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.post(BASE_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.profile;
  } catch (err) {
    console.error(err);
  }
};

export { getMyProfile, createOrUpdate };
