import { useState } from "react";

import { IRestaurant } from "../interface/IRestaurant";
import { IRestaurantAuth } from "../interface/IRestaurantAuth";
import { IRestaurantUpdate } from "../interface/IRestaurantEdit";
import { get, put } from "../services/apiRequest";

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [restaurantAuth, setRestaurantAuth] = useState<IRestaurantAuth>();
  const [restaurantPhoto, setRestaurantPhoto] = useState();
  const [putRestaurantSucceeded, setPutRestaurantSucceeded] = useState(false);
  const [putRestaurantError, setPutRestaurantError] = useState(false);

  async function getPhoto(id: string) {
    try {
      const response = await get(`/photo/${id}`);
      setRestaurantPhoto(response.data.code);
    } catch (error) {
      // console.log(error);
    }
  }
  async function getRestaurant() {
    try {
      const response = await get("/restaurant/auth");
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

  async function getRestaurantAuth() {
    try {
      const response = await get("/auth");
      getPhoto(response.data.restaurant.photo_url.slice(40));
      setRestaurantAuth(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    restaurant,
    getRestaurantAuth,
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
