import axiosInstance from '../../Shared/Api/axiosInstance'; // Adjust the relative path
import { projectResponseModel } from '../model/projectResponseModel';

export const getProjectById = async (projectId: string): Promise<projectResponseModel> => { // Accept projectId as a string
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const response = await axiosInstance.get<projectResponseModel>(
    `${backendUrl}/api/v1/project/${projectId}` // Pass projectId as string
  );
  return response.data;
};
