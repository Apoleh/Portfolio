/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zakoResponseModel } from './model/zakoResponseModel';
import { getAllzako } from './api/getAllZako';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ZakoList.css';

const ZakoList: React.FC = (): JSX.Element => {
  const [zakoItems, setZakoItems] = useState<zakoResponseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZakoData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await getAllzako();
        if (Array.isArray(response)) {
          setZakoItems(response);
        } else {
          console.error('Fetched data is not an array:', response);
        }
      } catch (error) {
        console.error('Error fetching zako items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchZakoData();
  }, []);

  const handleZakoClick = (zakoId: number): void => {
    navigate(`/zako/${zakoId}`);
  };

  if (loading) {
    return <div>Loading zako items...</div>;
  }

  return (
    <div className="zako-section">
      <h2 className="page-title">Zako</h2>
      <div className="zako-list">
        {zakoItems.length > 0 ? (
          zakoItems.map(item => (
            <div
              className="zako-item"
              key={item.zakoId}
              onClick={() => handleZakoClick(item.zakoId)}
            >
              <div className="zako-item-content">
                <p className="zako-nationality">Nationality: {item.nationality}</p>
                <p className="zako-age">Age: {item.age}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">No zako items available</p>
        )}
      </div>
    </div>
  );
};

export default ZakoList;
