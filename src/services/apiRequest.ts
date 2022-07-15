import api from "./api";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const defaultDomainURL = "https://0859-179-235-88-84.ngrok.io";

export const get = (url: string) => {
  return api
    .get(`${defaultDomainURL}${url}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const post = (url: string, body: string | object) => {
  return api
    .post(`${defaultDomainURL}${url}`, body, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const Delete = (url: string) => {
  return api
    .delete(`${defaultDomainURL}${url}`, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const put = (url: string, body: string | object) => {
  return api
    .put(`${defaultDomainURL}${url}`, body, config)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
