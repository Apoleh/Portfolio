import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projectResponseModel } from './model/projectResponseModel';
import { getProjectById } from './api/getProjectById';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjectDetails.css';

const ProjectDetails: React.FC = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<projectResponseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleBack = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  if (loading) {
    return <div>Loading project details...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-details">
      <button className="btn btn-secondary back-btn" onClick={handleBack}>
        Back
      </button>
      <h2 className="project-title">{project.projectName}</h2>
      <img
        src={project.imageUrl}
        alt={project.projectName}
        className="project-details-image"
      />
      <p className="project-description">{project.description}</p>
      <div className="skill-list">
        {project.skills.map((skill, index) => (
          <span key={index} className="skill-badge">
            {skill.skillName}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;