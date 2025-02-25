import React, { useState, useEffect } from 'react';
import { felixResponseModel } from './model/felixResponseModel';
import { getAllFelix } from './api/getAllFelix';
import { getAllSkills } from './api/getAllSkills';
import { addSkill } from './api/addSkill';
import { deleteSkill } from './api/deleteSkill';
import { FaJava, FaCloud, FaJsSquare, FaPython, FaGamepad, FaCogs, FaAndroid, FaHtml5, FaDatabase, FaReact } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './FelixList.css';

const FelixList: React.FC = (): JSX.Element => {
  const [felixItems, setFelixItems] = useState<felixResponseModel[]>([]);
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [newSkill, setNewSkill] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFelixData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllFelix();
        if (Array.isArray(response)) {
          setFelixItems(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }

        const skillsResponse = await getAllSkills();
        setSkills(skillsResponse.map(skill => ({
          id: skill.skillId,
          name: skill.skillName
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFelixData();

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

  const skillIcons: Record<string, JSX.Element> = {
    'Spring Boot': <FaJava />,
    Azure: <FaCloud />,
    JavaScript: <FaJsSquare />,
    Python: <FaPython />,
    Unity: <FaGamepad />,
    'C#': <FaCogs />,
    'C++': <FaCogs />,
    Android: <FaAndroid />,
    HTML: <FaHtml5 />,
    '.Net': <FaCogs />,
    MongoDb: <FaDatabase />,
    Java: <FaJava />,
    Mysql: <FaDatabase />,
    React: <FaReact />,
    csHtml: <FaHtml5 />,
    TypeScript: <FaJsSquare />
  };

  const handleFelixClick = (felixId: string, aboutMe: string): void => {
    if (isOwner) {
      navigate(`/update/${felixId}`, {
        state: { aboutMe } // Pass aboutMe to the update page
      });
    }
  };

  const handleAddSkill = async (): Promise<void> => {
    if (newSkill && !skills.some(skill => skill.name === newSkill)) {
      try {
        const skill = { skillName: newSkill };
        await addSkill(skill);
        window.location.reload();
        setNewSkill('');
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    }
  };

  const handleDeleteSkill = async (skillId: string): Promise<void> => {
    const confirmation = window.confirm(`Are you sure you want to delete this skill?`);
    if (confirmation) {
      try {
        await deleteSkill(skillId);
        setSkills(skills.filter(skill => skill.id !== skillId));
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-text">
        Loading Felix items and skills, please wait...
      </div>
    );
  }

  return (
    <div className="felix-section">
      <h2 className="page-title">About Me</h2>
      <div className="felix-list">
        {felixItems.length > 0 ? (
          felixItems.map(item => (
            <div
              className="felix-item"
              key={item.felixId}
              onClick={() => handleFelixClick(item.felixId, item.aboutMe)} // Pass aboutMe here
            >
              <div className="felix-item-content">
                <p className="felix-about-me">{item.aboutMe}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No Felix items available</p>
        )}
      </div>

      {/* Skills Section */}
      <div className="skills-section">
        <h3>My Skills</h3>

        <div className="skills-list">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="skill-item"
                onClick={() => isOwner && handleDeleteSkill(skill.id)}
              >
                {skillIcons[skill.name] || <FaCogs />} {/* Default cog icon */}
                <span>{skill.name}</span>
              </div>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>

        {/* Add Skill Input */}
        {isOwner && (
          <div className="add-skill-container">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
              className="add-skill-input"
            />
            <button onClick={handleAddSkill} className="btn btn-primary">
              Add Skill
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FelixList;
