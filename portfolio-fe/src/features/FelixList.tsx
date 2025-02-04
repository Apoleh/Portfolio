/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { felixResponseModel } from './model/felixResponseModel';
import { getAllFelix } from './api/getAllFelix';
import { getAllSkills } from './api/getAllSkills';  // Import the getAllSkills function
import './FelixList.css';

const FelixList: React.FC = (): JSX.Element => {
  const [felixItems, setFelixItems] = useState<felixResponseModel[]>([]);
  const [skills, setSkills] = useState<string[]>([]);  // State to store skills
  const [loading, setLoading] = useState<boolean>(true);
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

        // Fetch skills data
        const skillsResponse = await getAllSkills();
        setSkills(skillsResponse.map(skill => skill.skillName));  // Access 'skillName' from the fetched skills
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFelixData();
  }, []);

  const handleFelixClick = (felixId: string): void => {
    navigate(`/felix/${felixId}`);
  };

  if (loading) {
    return <div>Loading felix items...</div>;
  }

  return (
      <div className="felix-section">
        <h2 className="page-title">Felix</h2>
        <div className="felix-list">
          {felixItems.length > 0 ? (
              felixItems.map(item => (
                  <div
                      className="felix-item"
                      key={item.felixId}
                      onClick={() => handleFelixClick(item.felixId)}
                  >
                    <div className="felix-item-content">
                      <p className="felix-about-me">About Me: {item.aboutMe}</p>
                    </div>
                  </div>
              ))
          ) : (
              <p className="no-items">No felix items available</p>
          )}
        </div>

        {/* Skills Section */}
        <div className="skills-section">
          <h3>My Skills</h3>
          <div className="skills-list">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  {skill}
                </div>
              ))
            ) : (
              <p>No skills available</p>
            )}
          </div>
        </div>

        <div className="cv-download-section">
          <a href="/assets/CV.pdf" download className="cv-button">
            Download CV (English)
          </a>
          <a href="/assets/CV(French).pdf" download className="cv-button">
            Download CV (French)
          </a>
        </div>

        {/* Contact Me Section */}
        <div className="contact-me-section">
          <p>Feel free to reach out! <a href="mailto:2231308@champlaincollege.qc.ca" className="contact-me-link">Contact Me</a></p>
        </div>
      </div>
  );
};

export default FelixList;
