import axios from 'axios';

const API_URL = 'http://localhost:8000';  // adjust if backend is deployed

export const loginUser = async (email) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email });
    return res.data; // returns { exists: true/false }
  } catch (err) {
    console.error("Login API error", err);
    throw err;
  }
};

export const signupUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, data);
    return res.data;
  } catch (err) {
    console.error("Signup API error", err);
    throw err;
  }
};
