import axiosInstance from "../../Shared/Api/axiosInstance";

// Function to delete a project
export const deleteComment = async (commentId: string): Promise<void> => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  await axiosInstance.delete<void>(`${backendUrl}/api/v1/comment/${commentId}`);
};
