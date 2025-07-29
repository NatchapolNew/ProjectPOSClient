import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const createProduct = async (token, form) => {
  try {
    const res = await axios.post(API_URL + "/products", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const listProduct = async (token) => {
  try {
    const res = await axios.get(API_URL + "/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
