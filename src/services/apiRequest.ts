import api from "./api";

const config = {
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgRGV2ZWxmb29kSUlJIiwic3ViIjoiNDQzIiwiaWF0IjoxNjU1NjU4MjA3LCJleHAiOjE2NTU3NDQ2MDd9.RpavHlmBpuwZBDQJ1Q95xBflZfVlFF_PB-0AhXK_34o`,
  },
};
// Authorization: `Bearer ${sessionStorage.getItem("token")}`,

const defaultDomainURL = "https://develfood-3.herokuapp.com";

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
