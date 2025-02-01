import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { felixResponseModel } from '../model/felixResponseModel';

export const getAllFelix = async (): Promise<felixResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<felixResponseModel[]>(
    `${backendUrl}/api/v1/felix`
  );
  return response.data;
};
