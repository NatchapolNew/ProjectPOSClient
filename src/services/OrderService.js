import axios from "axios";

const API_URL = "http://localhost:8080/api";
export const createOrder = async (token, payload) => {
  try {
    const res = await axios.post(API_URL + "/order", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};