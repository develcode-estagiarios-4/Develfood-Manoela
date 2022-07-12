import { useState } from "react";

import { IRestaurant } from "../interface/IRestaurant";
import { IRestaurantUpdate } from "../interface/IRestaurantEdit";
import { get, put } from "../services/apiRequest";

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();
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
      // setTimeout(() => {
      //   setPutRestaurantSucceeded(false);
      // }, 3000);
    } catch (error) {
      setPutRestaurantError(true);
      if (error)
        setTimeout(() => {
          setPutRestaurantError(false);
        }, 3000);
    }
  }

  return {
    restaurant,
    getRestaurant,
    editRestaurant,
    setPutRestaurantSucceeded,
    putRestaurantSucceeded,
    putRestaurantError,
  };
}
