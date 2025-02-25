import axiosInstance from "../../Shared/Api/axiosInstance";
import { felixRequestModel } from "../model/felixRequestModel";
import { felixResponseModel } from "../model/felixResponseModel";

export const updateFelix = async (
  felixId: string,
  felix: felixRequestModel
): Promise<void> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  await axiosInstance.put<void>(`${backendUrl}/api/v1/felix/${felixId}`, felix);
};

export const getFelix = async (felixId: string): Promise<felixResponseModel> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<felixResponseModel>(
    `${backendUrl}/api/v1/felix/${felixId}`
  );
  return response.data;
};
