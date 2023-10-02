import axios from "axios";
import cookie from "cookiejs";
const BASE_URL = "/product";

const token = cookie.get("jwt");
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Error fetching data.Please try again later",
});

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const postProduct = async (body) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      data: body,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const putProduct = async (body) => {
  try {
    const response = await axiosInstance({
      method: "PUT",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
