import axios from "axios";

const BASE_URL = "/supplier";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Error fetching data.Please try again later",
});

export const getAllSuppliers = async () => {
  try {
    const response = await axiosInstance({
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postSupplier = async (body) => {
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

export const putSupplier = async (body) => {
  console.table(body);
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
    throw new Error(error.message);
  }
};

export const deleteSupplier = async (id) => {
  try {
    const response = await axiosInstance({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
