import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectResponseModel } from './model/projectResponseModel';
import { getProjectById } from './api/getProjectById';
import { deleteProject } from './api/deleteProject';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectDetails.css';

const ProjectDetails: React.FC = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<projectResponseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetails = async (): Promise<void> => {
      if (!projectId) {
        console.error('Project ID is undefined');
        return;
      }

      try {
        setLoading(true);
        const response = await getProjectById(projectId);
        setProject(response);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError('Error fetching project details');
      } finally {
        setLoading(false);
      }
    };

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const base64Url = accessToken.split('.')[1];
      try {
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];
        setIsOwner(roles.includes('Felix'));
      } catch (e) {
        console.error('Error decoding token:', e);
        setError('Error decoding token');
      }
    }

    fetchProjectDetails();
  }, [projectId]);

  const handleBack = () => navigate(-1);

  const handleImageClick = () => {
    if (project?.projectLink) {
      window.open(project.projectLink, '_blank');
    }
  };

  const handleUpdate = () => navigate(`/updateProject/${projectId}`);

  const handleDelete = async () => {
    if (!projectId) {
      setError('Project ID is missing.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        navigate('/project');
      } catch (error) {
        console.error('Error deleting project:', error);
        setError('Error deleting project');
      }
    }
  };

  if (loading) return <div>Loading project details...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-details">
      <button className="btn btn-secondary back-btn" onClick={handleBack}>Back</button>
      {isOwner && (
        <>
          <button className="btn btn-primary update-btn" onClick={handleUpdate}>Update Project</button>
          <button className="btn btn-danger delete-btn" onClick={handleDelete}>Delete Project</button>
        </>
      )}
      <h2 className="project-title">{project.projectName}</h2>
      <img src={project.imageUrl} alt={project.projectName} className="project-details-image" onClick={handleImageClick} />
      <div className="project-info">
        <div className="project-description"><strong>Description:</strong> {project.description}</div>
        <div className="skill-list">
          <strong>Skills Used:</strong> {project.skills.map((skill, index) => <span key={index} className="skill-badge">{skill.skillName}</span>)}
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ProjectDetails;