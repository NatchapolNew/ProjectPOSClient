import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const login = async (data) => {
  try {
    const res = await axios.post(API_URL + "/login", data);
    return res;
  } catch (err) {
    console.log(err);
  }
};
