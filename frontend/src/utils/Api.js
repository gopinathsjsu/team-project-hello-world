import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:5000";

export async function post({ endpoint, body }) {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, body);
    return response;
  } catch (error) {
    return {
      status: error.response.data.status,
      meesage: error.response,
    };
  }
}

export async function get({ endpoint, params }) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, params);
    return response;
  } catch (error) {
    return {
      status: 500,
      meesage: error.toString(),
    };
  }
}
