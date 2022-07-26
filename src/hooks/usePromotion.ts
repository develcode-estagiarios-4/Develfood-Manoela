import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

interface IPageableData {
  page: number;
  totalPages: number;
}

export function usePromotion() {
  const navigate = useNavigate();

  const [postSuccessed, setPostSuccessed] = useState(false);
  const [postError, setError] = useState(false);
  const [putToast, setPutToast] = useState(false);
  const [putError, setPutPromotionError] = useState(false);

  const [promotion, setPromotion] = useState(defaultPromotionValues);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [promotionBanner, setPromotionBanner] = useState(null);
  const [pageableData, setpageableData] = useState<IPageableData>({
    page: 0,
    totalPages: 0,
  });

  const postPromotion = async (data: INewPromotion) => {
    try {
      const response = await post("/restaurantPromotion", data);
      setPostSuccessed(true);
      navigate("/promotion");
      setTimeout(() => {
        setPostSuccessed(false);
      }, 3000);
    } catch (error) {
      setError(true);
      // console.log(error);

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
      setPromotion(response.data);
      console.log(response);
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
      setpageableData({
        page: response.data.pageable.pageNumber + 1,
        totalPages: response.data.totalPages,
      });
    } catch (error) {
      // console.log(error);
    }
  }

  async function getPromotionBanner(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      setPromotionBanner(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }

  async function updatePromotion(id: string, data: INewPromotion) {
    try {
      const response = await put(`/restaurantPromotion/${id}`, data);
      setPutToast(true);
      setTimeout(() => {
        setPutToast(false);
      }, 3000);
    } catch (error) {
      setPutPromotionError(true);
      setTimeout(() => {
        setPutPromotionError(false);
      }, 3000);
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
    putToast,
    putError,
    pageableData,
    getPromotions,
    promotionBanner,
    setPutToast,
    promotions,
    promotion,
  };
}
