import { useState } from "react";

import { INewPromotion } from "../interface/INewPromotion";
import { IPromotion } from "../interface/IPromotion";
import { get, post, Delete, put } from "../services/apiRequest";

const defaultPromotionValues = {
  id: "",
  name: "",
  percent: "",
  dateInitial: "",
  dateFinal: "",
  restaurant: {
    id: "",
    name: "",
    photo_url: "",
    food_types: [
      {
        id: "",
        name: "",
      },
    ],
  },
  photo_url: "",
};

export function usePromotion() {
  const [postSuccessed, setPostSuccessed] = useState(false);
  const [postError, setError] = useState(false);
  const [putSuccessed, setPutSuccessed] = useState(false);
  const [putError, setPutError] = useState(false);

  const [promotion, setPromotion] = useState(defaultPromotionValues);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [promotionBanner, setPromotionBanner] = useState(null);

  const postPromotion = async (data: INewPromotion) => {
    try {
      const response = await post("/restaurantPromotion", data);
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

  const deletePromotion = async (id: number) => {
    try {
      const response = await Delete(`/restaurantPromotion/${id}`);
    } catch (error) {
      // alert(error);
    }
  };

  async function getPromotion(id: number) {
    try {
      const response = await get(`/restaurantPromotion/${id}`);
      console.log(response.data.content);
      setPromotion(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPromotions(page = 0, quantity = 10) {
    try {
      const response = await get(
        `/restaurantPromotion/restaurant?page=${page}&quantity=${quantity}`
      );
      setPromotions(response.data.content);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPromotionBanner(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      // console.log(response.data.code);
      setPromotionBanner(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }

  async function updatePromotion(id: string, data: INewPromotion) {
    try {
      const response = await put(`/restaurantPromotion/${id}`, data);
      setPutSuccessed(true);
      console.log(putSuccessed);
      console.log(response);
      setTimeout(() => {
        setPutSuccessed(false);
      }, 3000);
    } catch (error) {
      setPutError(true);
      console.log(error);
      setTimeout(() => {
        setPutError(false);
      }, 3000);
      // console.log(error);
    }
  }

  return {
    postPromotion,
    updatePromotion,
    postSuccessed,
    postError,
    deletePromotion,
    getPromotion,
    getPromotionBanner,
    putSuccessed,
    putError,
    getPromotions,
    promotionBanner,
    promotions,
    promotion,
  };
}
