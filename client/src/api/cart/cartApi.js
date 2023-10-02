import axios from "axios";

const BASE_URL = "/cart";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Error fetching data.Please try again later",
});

export const getAllCarts = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllCartByInvoiceNo = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/cart/${id}`,
      headers: {
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postCart = async (body) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putCart = async (body) => {
  console.table(body);
  try {
    const response = await axiosInstance({
      url: `${BASE_URL}/${body.id}`,
      method: "PUT",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCart = async (id) => {
  try {
    const response = await axiosInstance({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
