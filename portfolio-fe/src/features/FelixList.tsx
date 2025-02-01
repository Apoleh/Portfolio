/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { felixResponseModel } from './model/felixResponseModel';
import { getAllFelix } from './api/getAllFelix';
import './FelixList.css';

const FelixList: React.FC = (): JSX.Element => {
  const [felixItems, setFelixItems] = useState<felixResponseModel[]>([]);
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
      } catch (error) {
        console.error('Error fetching felix items:', error);
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
                      <p className="felix-nationality">Nationality: {item.nationality}</p>
                      <p className="felix-age">Age: {item.age}</p>
                      <p className="felix-about-me">About Me: {item.aboutMe}</p>
                    </div>
                  </div>
              ))
          ) : (
              <p className="no-items">No felix items available</p>
          )}
        </div>
      </div>
  );
};

export default FelixList;