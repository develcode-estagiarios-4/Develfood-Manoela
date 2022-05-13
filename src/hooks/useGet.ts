import api from "../services/api";

interface IBody {
  email: any;
  password: any;
}

const url = "";

export const useGet = async (data: IBody) => {
  const response = await api.post(url, data);
};

export const useGett = async (data: IBody, url: string) => {
  const response = await api.post(url, data);
};
