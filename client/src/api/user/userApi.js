import axios from "axios";

const BASE_URL = "/user";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Error fetching data.Please try again later",
});

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUser = async (body) => {
  try {
    const response = await axios({
      url: `/user/login`,
      method: "POST",
      data: body,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const postUser = async (body) => {
  let formData = new FormData();
  formData.append("id", body.id);
  formData.append("avatar", body.image);
  formData.append("firstname", body.firstname);
  formData.append("lastname", body.lastname);
  formData.append("username", body.username);
  formData.append("email", body.email);
  formData.append("password", body.password);

  try {
    const response = await axiosInstance({
      method: "POST",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const putUser = async (body) => {
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
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/user/${id}`,
      method: "DELETE",
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
