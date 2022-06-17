import api from "./api";

const config = {
  // headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgRGV2ZWxmb29kSUlJIiwic3ViIjoiNjYiLCJpYXQiOjE2NTU0ODQ3NTEsImV4cCI6MTY1NTU3MTE1MX0.FoAPj_a4FnPtljZfyyKu9ep1Uu9KfhMzUJLjTf5pWCw`,
  },
};

const defaultDomainURL = "https://d0cd-179-235-88-84.ngrok.io";

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
