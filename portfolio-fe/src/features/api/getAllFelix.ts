import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { zakoResponseModel } from '../model/zakoResponseModel';

export const getAllzako = async (): Promise<zakoResponseModel[]> => {
  // Use menuResponseModel[] directly in the get call
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<zakoResponseModel[]>(
    `${backendUrl}/api/v1/zako`
  );
  return response.data;
};
