import { useState } from "react";

import { IRequest } from "../interface/IRequest";
import { IRequestStatus } from "../interface/IRequestStatus";
import { get, put } from "../services/apiRequest";

export function useRequest() {
  const [requests, setRequests] = useState<IRequest[]>([]);

  async function getRequests() {
    try {
      const response = await get("/request/restaurant");
      setRequests(response.data);
    } catch (error) {
      // console.log(error);
    }
  }

  async function updateRequest(id: number, data: IRequestStatus) {
    try {
      const response = await put(`/request/${id}/status`, data);
    } catch (error) {
      // console.log(error);
    }
  }

  return {
    getRequests,
    updateRequest,
    requests,
    setRequests,
  };
}
