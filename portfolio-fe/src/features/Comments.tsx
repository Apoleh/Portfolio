/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { commentResponseModel } from './model/commentResponseModel';
import { getApprovedComments, getUnapprovedComments, approveComment } from './api/getComments';
import { deleteComment } from './api/deleteComment';
import './Comments.css';
import { useNavigate } from 'react-router-dom';

const Comments: React.FC = (): JSX.Element => {
    const [approvedComments, setApprovedComments] = useState<commentResponseModel[]>([]);
    const [unapprovedComments, setUnapprovedComments] = useState<commentResponseModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isFelix, setIsFelix] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                console.error('No access token found');
                setLoading(false);
                return;
            }

            try {
                const base64Url = accessToken.split('.')[1];
                const decodedPayload = JSON.parse(atob(base64Url));

                const roles: string[] = decodedPayload['https://portfolio/roles'] || [];
                setIsFelix(roles.includes('Felix'));
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        fetchUserInfo();
    }, []);

    useEffect(() => {
        const fetchCommentsData = async (): Promise<void> => {
            try {
                setLoading(true);
                const approvedResponse = await getApprovedComments();
                setApprovedComments(Array.isArray(approvedResponse) ? approvedResponse : []);

                if (isFelix) {
                    const unapprovedResponse = await getUnapprovedComments();
                    setUnapprovedComments(Array.isArray(unapprovedResponse) ? unapprovedResponse : []);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommentsData();
    }, [isFelix]);

    const handleApprove = async (commentId: string) => {
        try {
            await approveComment(commentId);
            setUnapprovedComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
            const approvedComment = unapprovedComments.find(comment => comment.commentId === commentId);
            if (approvedComment) {
                setApprovedComments(prevComments => [...prevComments, approvedComment]);
            }
        } catch (error) {
            console.error('Error approving comment:', error);
        }
    };

    const handleDelete = async (commentId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this comment?');
        if (!confirmDelete) return;

        try {
            await deleteComment(commentId);
            setApprovedComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
            setUnapprovedComments(prevComments => prevComments.filter(comment => comment.commentId !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className="top-section">
            <h2>Comments</h2>
            <div className="comment-list">
                {approvedComments.length > 0 ? (
                    approvedComments.map(comment => (
                        <div className="comment-item" key={comment.commentId}>
                            <p className="comment-author"><b>Name:</b> {comment.author}</p>
                            <p className="comment-content"><b>Comment:</b> {comment.comment}</p>
                            {isFelix && (
                                <button onClick={() => handleDelete(comment.commentId)} className="delete-button">
                                    Delete
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-items">No approved comments available</p>
                )}
            </div>
            <button onClick={() => navigate(`/addComment`)} className="comment-button">Add Comment</button>
            {isFelix && (
                <>
                    <h2>Unapproved Comments</h2>
                    <div className="comment-list">
                        {unapprovedComments.length > 0 ? (
                            unapprovedComments.map(comment => (
                                <div className="comment-item unapproved" key={comment.commentId}>
                                    <p className="comment-author"><b>Name:</b> {comment.author}</p>
                                    <p className="comment-content"><b>Comment:</b> {comment.comment}</p>
                                    <button onClick={() => handleApprove(comment.commentId)} className="approve-button">
                                        Approve
                                    </button>
                                    {isFelix && (
                                        <button onClick={() => handleDelete(comment.commentId)} className="delete-button">
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="no-items">No unapproved comments available</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Comments;
