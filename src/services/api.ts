import axios from "axios";

const api = axios.create();
api.defaults.headers.common.Authorization =
  "Bearer 8d0897f593cbb563bd622ff0ad5d4f5a072bd0cc0daa39456598cdc35ab5c5bc";

export default api;
