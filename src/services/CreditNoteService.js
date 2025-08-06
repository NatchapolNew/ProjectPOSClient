import axios from "axios";

const API_URL = "http://localhost:8080/api";
export const createCreditNote = async (token, payload) => {
  try {
    const res = await axios.post(API_URL + "/cn", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getAllCreditNote = async (token) => {
  try {
    const res = await axios.get(API_URL + "/cn", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCreditNoteById = async (token,id) => {
  try {
    const res = await axios.get(API_URL + "/cn/"+id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCreditNoteByDate = async (token, startDate, endDate) => {
  try {
    const res = await axios.get(API_URL + "/cn/by-range", {
      params: {
        start: startDate,
        end: endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};