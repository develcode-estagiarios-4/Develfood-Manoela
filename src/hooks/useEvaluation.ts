import { useState } from "react";

import { get } from "../services/apiRequest";

export function useEvaluation() {
  const [grade, setGrade] = useState(0);

  const getGrade = async (id: number) => {
    try {
      const response = await get(`/restaurantEvaluation/${id}/grade`);
      setGrade(response.data);
    } catch (error) {
      // alert(error);
    }
  };

  return {
    grade,
    getGrade,
  };
}
