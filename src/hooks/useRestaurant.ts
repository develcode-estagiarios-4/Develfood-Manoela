import { useState } from "react";

import { IRestaurant } from "../interface/IRestaurant";
import { IRestaurantUpdate } from "../interface/IRestaurantEdit";
import { get, put } from "../services/apiRequest";

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [photoRestaurant, setPhotoRestaurant] = useState();
  const [putRestaurantSucceeded, setPutRestaurantSucceeded] = useState(false);
  const [putRestaurantError, setPutRestaurantError] = useState(false);

  async function getRestaurant() {
    try {
      const response = await get("/user");
      setRestaurant(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function editRestaurant(id: number, data: IRestaurantUpdate) {
    try {
      const response = await put(`/restaurant/${id}`, data);
      setPutRestaurantSucceeded(true);
      console.log("oi");
      setTimeout(() => {
        setPutRestaurantSucceeded(false);
      }, 3000);
    } catch (error) {
      setPutRestaurantError(true);
      if (error)
        setTimeout(() => {
          setPutRestaurantError(false);
        }, 3000);
    }
  }

  async function getPhoto() {
    try {
      const response = await get("/photo_url");
      setPhotoRestaurant(response.data);
      console.log(response);
    } catch (error) {
      // console.log(error);
    }
  }

  async function restaurantAuth() {
    try {
      const response = await get("/auth");
      console.log(response.data.restaurant);
      setPhotoRestaurant(response.data.restaurant);
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    restaurant,
    getPhoto,
    photoRestaurant,
    getRestaurant,
    restaurantAuth,
    editRestaurant,
    setPutRestaurantSucceeded,
    putRestaurantSucceeded,
    putRestaurantError,
  };
}
