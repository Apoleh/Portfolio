import { AxiosResponse } from "axios";
import { skillRequestModel } from "../model/skillRequestModel";
import axiosInstance from '../../Shared/Api/axiosInstance';

export const addSkill = async (
    skill: skillRequestModel
  ): Promise<AxiosResponse<void>> => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      return await axiosInstance.post<void>(
        `${backendUrl}/api/v1/skill`,
        skill
      );
    } catch (error) {
      throw new Error(`Failed to add skill: ${error}`);
    }
  };
