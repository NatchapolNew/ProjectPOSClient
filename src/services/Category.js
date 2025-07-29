import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getAllCategory = async (token) => {
  try {
    const res = await axios.get(API_URL + "/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
