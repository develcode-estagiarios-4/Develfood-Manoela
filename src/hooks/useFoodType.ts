import { useState } from "react";

import api from "../services/api";

const url = "https://develfood-3.herokuapp.com/foodType";

export function useFoodType() {
  const [foodTypes, setFoodTypes] = useState();

  const usePostFood = async () => {
    try {
      const response = await api.get(url);
      if (response.status === 200) {
        console.log(response.data);
        setFoodTypes(response.data);
      }
    } catch (error) {
      if (error) alert(error);
    }
  };

  return { usePostFood, foodTypes };
}
