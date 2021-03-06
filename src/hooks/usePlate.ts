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
  const [postPlateSuccessed, setPostPlateSuccessed] = useState(false);
  const [postPlateError, setPlateError] = useState(false);
  const [putPlateSuccessed, setPutPlateSuccessed] = useState(false);
  const [putPlateError, setPutPlateError] = useState(false);

  const [plate, setPlate] = useState(defaultPlateValues);
  const [plates, setPlates] = useState<IPlate[]>([]);
  const [plateBanner, setPlateBanner] = useState("");
  const [filteredPlates, setFilteredPlates] = useState<IPlate[]>([]);

  const postPlate = async (data: [INewPlate]) => {
    try {
      const response = await post("/plate", data);
      setPostPlateSuccessed(true);
      setTimeout(() => {
        setPostPlateSuccessed(false);
      }, 3000);
    } catch (error) {
      setPlateError(true);
      if (error)
        setTimeout(() => {
          setPlateError(false);
        }, 3000);
    }
  };

  const deletePlate = async (id: number) => {
    try {
      const response = await Delete(`/plate/${id}`);
    } catch (error) {
      // alert(error);
    }
  };

  async function getPlate(id: number) {
    try {
      const response = await get(`/plate/${id}`);
      setPlate(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPlates(page = 0, quantity = 10) {
    try {
      const response = await get(`/plate?page=0&quantity=20`);
      setPlates(response.data.content);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPlateBanner(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      setPlateBanner(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }

  async function updatePlate(id: string, data: INewPlate) {
    try {
      const response = await put(`/plate/${id}`, data);
      setPutPlateSuccessed(true);
      setTimeout(() => {
        setPutPlateSuccessed(false);
      }, 3000);
    } catch (error) {
      setPutPlateError(true);
      setTimeout(() => {
        setPutPlateError(false);
      }, 3000);
    }
  }

  async function searchPlate(filter: string, id: number) {
    try {
      const response = await get(
        `/plate/search?name=${filter}&restaurantid=${id}`
      );
      setFilteredPlates(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    filteredPlates,
    postPlate,
    updatePlate,
    postPlateSuccessed,
    searchPlate,
    postPlateError,
    deletePlate,
    getPlate,
    setPlates,
    getPlateBanner,
    setPlateBanner,
    putPlateSuccessed,
    putPlateError,
    getPlates,
    plateBanner,
    plates,
    plate,
  };
}
