import axios from "axios";

const BASE_URL = "/customer";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  timeoutErrorMessage: "Error fetching data.Please try again later",
});

export const getAllCustomers = async (date) => {
  try {
    const response = await axiosInstance.get();
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const getAllCustomersByDate = async (date) => {
  try {
    const response = await axiosInstance({
      params: {
        from: date.from,
        to: date.to,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postCustomer = async (body) => {
  try {
    const customer = await axiosInstance({
      method: "POST",
      data: body.customer,
      headers: {
        "content-type": "application/json",
      },
    });

  
    await axios({
      url: "/cart",
      method: "POST",
      data: body.products,
      headers: {
        "content-type": "application/json",
      },
    });

    return customer.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const putCustomer = async (body) => {
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

export const deleteCustomer = async (id) => {
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
