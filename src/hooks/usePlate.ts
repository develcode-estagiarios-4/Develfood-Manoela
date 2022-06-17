import { useState } from "react";

import { INewPlate } from "../interface/INewPlate";
import { IPlate } from "../interface/IPlate";
import { get, post, Delete, put } from "../services/apiRequest";

const defaultPlateValues = {
  id: "",
  name: "",
  description: "",
  price: "",
  foodType: {
    id: "",
    name: "",
  },
  restaurantName: "",
  photo_url: "",
};

export function usePlate() {
  const [postSuccessed, setPostSuccessed] = useState(false);
  const [postError, setError] = useState(false);
  const [putSuccessed, setPutSuccessed] = useState(false);
  const [putError, setPutError] = useState(false);
  const [platesUpdated, setPlatesUpdated] = useState(false);

  const [plate, setPlate] = useState(defaultPlateValues);
  const [plates, setPlates] = useState<IPlate[]>([]);
  const [plateBanner, setPlateBanner] = useState("");

  const postPlate = async (data: INewPlate) => {
    try {
      const response = await post("/plate", data);
      setPostSuccessed(true);
      setTimeout(() => {
        setPostSuccessed(false);
      }, 3000);
    } catch (error) {
      setError(true);
      if (error)
        setTimeout(() => {
          setError(false);
        }, 3000);
    }
  };

  const deletePlate = async (id: number) => {
    try {
      const response = await Delete(`/plate/${id}`);
      setPlatesUpdated(true);
      console.log("deletadoohhh");
      console.log(response);
    } catch (error) {
      // alert(error);
    }
  };

  async function getPlate(id: number) {
    try {
      const response = await get(`/plate/${id}`);
      // console.log(response.data)
      setPlate(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPlates(page = 0, quantity = 10) {
    try {
      const response = await get(`/plate?page=0&quantity=20`);
      setPlates(response.data.content);
      console.log(response.data.content);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPlateBanner(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      // console.log(response.data.code);
      setPlateBanner(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }

  async function updatePlate(id: string, data: INewPlate) {
    try {
      const response = await put(`/plate/${id}`, data);
      setPutSuccessed(true);
      setTimeout(() => {
        setPutSuccessed(false);
      }, 3000);
    } catch (error) {
      setPutError(true);
      setTimeout(() => {
        setPutError(false);
      }, 3000);
      // console.log(error);
    }
  }

  async function searchPlate(data: string, id: number) {
    try {
      const response = await get(
        `plate/search?name=${data}&restaurantid=${id}`
      );
      console.log(response);
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    postPlate,
    updatePlate,
    postSuccessed,
    searchPlate,
    postError,
    deletePlate,
    platesUpdated,
    getPlate,
    setPlatesUpdated,
    getPlateBanner,
    setPlateBanner,
    putSuccessed,
    putError,
    getPlates,
    plateBanner,
    plates,
    plate,
  };
}
