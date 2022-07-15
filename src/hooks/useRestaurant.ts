import { useState } from "react";

import { IRestaurant } from "../interface/IRestaurant";
import { IRestaurantUpdate } from "../interface/IRestaurantEdit";
import { get, put } from "../services/apiRequest";

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [restaurantPhoto, setRestaurantPhoto] = useState();
  const [putRestaurantSucceeded, setPutRestaurantSucceeded] = useState(false);
  const [putRestaurantError, setPutRestaurantError] = useState(false);

  async function getRestaurant() {
    try {
      const response = await get("/user");
      console.log(response);
      setRestaurant(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function editRestaurant(id: number, data: IRestaurantUpdate) {
    try {
      const response = await put(`/restaurant/${id}`, data);
      setPutRestaurantSucceeded(true);
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

  async function getPhoto(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      console.log(response);
      setRestaurantPhoto(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }

  async function restaurantAuth() {
    try {
      const response = await get("/auth");
      console.log(response.data);
      getPhoto(response.data.restaurant.photo_url.slice(40));
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    restaurant,
    getPhoto,
    restaurantPhoto,
    getRestaurant,
    restaurantAuth,
    editRestaurant,
    setPutRestaurantSucceeded,
    putRestaurantSucceeded,
    putRestaurantError,
  };
}
