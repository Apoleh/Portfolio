import axiosInstance from '../../Shared/Api/axiosInstance';
import { commentResponseModel } from '../model/commentResponseModel';
import { commentRequestModel } from "../model/commentRequestModel";
import { AxiosResponse } from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllcomments = async (): Promise<commentResponseModel[]> => {

    const response = await axiosInstance.get<commentResponseModel[]>(
        `${backendUrl}/api/v1/comment`
    );
    return response.data;
};

export const getCommentById = async (
    commentId: number
): Promise<commentResponseModel> => {
    const response = await axiosInstance.get<commentResponseModel>(
        `${backendUrl}/api/v1/comment/${commentId}`
    );
    return response.data;
}

export const addComment = async (
    project: commentRequestModel
): Promise<AxiosResponse<void>> => {
    return await axiosInstance.post<void>(
        `${backendUrl}/api/v1/comment`,
        project
    );
}

export const updateComment = async (
    commentId: string,
    comment: commentRequestModel
): Promise<void> => {
    await axiosInstance.put<void>(
        `${backendUrl}/api/v1/comment/${commentId}`, comment
    );
}

export const deleteComment = async (
    commentId: number
): Promise<void> => {
    await axiosInstance.delete<void>(
        `${backendUrl}/api/v1/comment/${commentId}`
    );
}

export const approveComment = async (
    commentId: string
): Promise<void> => {
    await axiosInstance.put<void>(
        `${backendUrl}/api/v1/comment/approve/${commentId}`
    );
}

export const getApprovedComments = async (): Promise<commentResponseModel[]> => {
    const response = await axiosInstance.get<commentResponseModel[]>(
        `${backendUrl}/api/v1/comment/approved`
    );
    return response.data;
}

export const getUnapprovedComments = async (): Promise<commentResponseModel[]> => {
    const response = await axiosInstance.get<commentResponseModel[]>(
        `${backendUrl}/api/v1/comment/unapproved`
    );
    return response.data;
}