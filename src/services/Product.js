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

export const getProductById = async (token, id) => {
  try {
    const res = await axios.get(API_URL + "/products/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getProductByBarcode = async (token, barcode) => {
  try {
    const res = await axios.get(API_URL + "/products/barcode/" + barcode, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getProductByName = async (token, name) => {
  try {
    const res = await axios.get(API_URL + "/products/search", {
      params: {
        name: name,
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

export const updateProduct = async (token, id, form) => {
  try {
    const res = await axios.put(API_URL + "/products/" + id, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteProduct = async (token, id) => {
  try {
    const res = await axios.delete(API_URL + "/products/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {}
};
