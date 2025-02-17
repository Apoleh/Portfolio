/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { felixResponseModel } from './model/felixResponseModel';
import { getAllFelix } from './api/getAllFelix';
import { getAllSkills } from './api/getAllSkills';
import { FaJava, FaCloud, FaJsSquare, FaPython, FaGamepad, FaCogs, FaAndroid, FaHtml5, FaDatabase, FaReact } from 'react-icons/fa'; // Add icons for skills
import './FelixList.css';

const FelixList: React.FC = (): JSX.Element => {
  const [felixItems, setFelixItems] = useState<felixResponseModel[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

        // Fetch skills data
        const skillsResponse = await getAllSkills();
        setSkills(skillsResponse.map(skill => skill.skillName));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFelixData();
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
              <div key={index} className="skill-item">
                {skillIcons[skill] || null}
                <span>{skill}</span>
              </div>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FelixList;
