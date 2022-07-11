import { useState } from "react";

import { IRestaurant } from "../interface/IRestaurant";
import { get } from "../services/apiRequest";

export function useRestaurant() {
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  async function getRestaurant() {
    try {
      const response = await get("/user");
      setRestaurant(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  return { restaurant, getRestaurant };
}
