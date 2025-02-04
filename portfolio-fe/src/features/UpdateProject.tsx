import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllSkills } from './api/getAllSkills';
import { projectRequestModel } from './model/projectRequestModel';
import { projectResponseModel, skillResponseModel } from './model/projectResponseModel';
import { getProject, updateProject } from './api/updateProject';
import "./UpdateProject.css";

const UpdateProjectForm: React.FC = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectName, setProjectName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [skills, setSkills] = useState<skillResponseModel[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<skillResponseModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectAndSkills = async (): Promise<void> => {
      try {
        if (!projectId) return;

        // Fetch project details
        const project: projectResponseModel = await getProject(projectId);
        setProjectName(project.projectName);
        setDescription(project.description);
        setImageUrl(project.imageUrl);
        setSelectedSkills(project.skills);

        // Fetch all skills
        const fetchedSkills = await getAllSkills();
        setSkills(fetchedSkills);
      } catch (error) {
        console.error('Error fetching project or skills:', error);
      }
    };

    fetchProjectAndSkills();
  }, [projectId]);

  const handleSkillToggle = (skill: skillResponseModel): void => {
    if (selectedSkills.find((s) => s.skillId === skill.skillId)) {
      setSelectedSkills(selectedSkills.filter((s) => s.skillId !== skill.skillId));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!projectId) {
      alert('Project ID is missing.');
      return;
    }

    const updatedProject: projectRequestModel = {
      projectName,
      description,
      imageUrl,
      skills: selectedSkills,
    };

    try {
      await updateProject(projectId, updatedProject);
      alert('Project updated successfully!');
      navigate('/project');
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    }
  };

  return (
    <div className="update-project-form">
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Skills</label>
          <div className="skill-list">
            {skills.map((skill) => (
              <span
                key={skill.skillId}
                className={`skill-item ${
                  selectedSkills.find((s) => s.skillId === skill.skillId)
                    ? 'selected'
                    : ''
                }`}
                onClick={() => handleSkillToggle(skill)}
              >
                {skill.skillName}
              </span>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Project
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectForm;