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

export const createCategory = async (token, form) => {
  try {
   const res = await axios.post(API_URL + "/categories", form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCategory = async(token,id)=>{
  try{
    const res = await axios.delete(API_URL+"/categories/"+id,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    return res;
  }catch(err){
    console.log(err)
  }
}
