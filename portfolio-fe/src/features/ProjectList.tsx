import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectResponseModel } from './model/projectResponseModel';
import { getAllProjects } from './api/getAllProjects';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectList.css';

const ProjectList: React.FC = (): JSX.Element => {
  const [projects, setProjects] = useState<projectResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllProjects();
        if (Array.isArray(response)) {
          setProjects(response);
        } else {
          console.error('Fetched data is not an array:', response);
          setError('Error: Data format issue');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();

    // Check for access token but allow page to load without it
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        const base64Url = accessToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(base64Url));
        const roles = decodedPayload['https://portfolio/roles'] || [];
        setIsOwner(roles.includes('Felix'));
      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
  }, []);

  const handleAddProject = (): void => {
    navigate('/addProject');
  };

  const handleProjectClick = (projectId: string): void => {
    navigate(`/project/${projectId}`);
  };

  if (loading) {
    return <div className="loading-text">Loading projects...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="project-section">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Projects</h2>
        {isOwner && (
          <button className="btn btn-primary" onClick={handleAddProject}>
            Add Project
          </button>
        )}
      </div>
      <div className="row">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="col-md-4 mb-4" key={project.projectId}>
              <div
                className="card project-card"
                onClick={() => handleProjectClick(project.projectId)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.projectName}
                  className="card-img-top project-image"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
                <div className="project-name-container">
                  <h5 className="project-name">{project.projectName}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No projects available</p>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
