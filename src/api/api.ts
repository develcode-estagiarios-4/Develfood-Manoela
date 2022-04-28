import axios from "axios";

export const Api = axios.create({
  baseURL: "https://gorest.co.in",
});
