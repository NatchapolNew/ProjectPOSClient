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

export const getAllOrder = async (token) => {
  try {
    const res = await axios.get(API_URL + "/order", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getOrderByDate = async (token, startDate, endDate) => {
  try {
    const res = await axios.get(API_URL + "order/by-range", {
      params: {
        start: startDate,
        end: endDate,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

// export const getProductByName = async (token, name) => {
//   try {
//     const res = await axios.get(API_URL + "/products/search", {
//       params: {
//         name: name,
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };
