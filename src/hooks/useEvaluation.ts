import { useState } from "react";

import { IEvaluation } from "../interface/IEvaluation";
import { get } from "../services/apiRequest";

export function useEvaluation() {
  const [grade, setGrade] = useState(0);
  const [totalPagesEvaluation, setTotalPagesEvaluation] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const [evaluation, setEvaluation] = useState<IEvaluation[]>();

  const getGrade = async (id: number) => {
    try {
      const response = await get(`/restaurantEvaluation/${id}/grade`);
      if (response.data >= 0) {
        setGrade(response.data);
      }
    } catch (error) {
      // alert(error);
    }
  };

  const getEvaluation = async (page = 0, quantity = 4) => {
    try {
      const response = await get(
        `/restaurantEvaluation/restaurant?page=${page}&quantity=${quantity}`
      );
      setTotalPagesEvaluation(response.data.totalPages);
      setEvaluation(response.data.content);
      setCurrentPage(response.data.number);
    } catch (error) {
      // alert(error);
    }
  };

  return {
    grade,
    getGrade,
    getEvaluation,
    currentPage,
    evaluation,
    totalPagesEvaluation,
  };
}
