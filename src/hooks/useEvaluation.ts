import { useState } from "react";

import { IComment } from "../interface/IComment";
import { get } from "../services/apiRequest";

export function useEvaluation() {
  const [grade, setGrade] = useState(0);
  const [totalPagesEvaluation, setTotalPagesEvaluation] = useState(0);

  const [evaluation, setEvaluation] = useState<IComment[]>();

  const getGrade = async (id: number) => {
    try {
      const response = await get(`/restaurantEvaluation/${id}/grade`);
      setGrade(response.data);
    } catch (error) {
      // alert(error);
    }
  };

  const getEvaluation = async (page = 0, quantity = 10) => {
    try {
      const response = await get(
        `/restaurantEvaluation/restaurant?page=${page}&quantity=${quantity}`
      );
      setTotalPagesEvaluation(response.data.totalPages);
      setEvaluation(response.data.content);
    } catch (error) {
      // alert(error);
    }
  };

  return {
    grade,
    getGrade,
    getEvaluation,
    evaluation,
    totalPagesEvaluation,
  };
}
