import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { felixResponseModel } from './model/felixResponseModel';
import { felixRequestModel } from './model/felixRequestModel';
import { getFelix, updateFelix } from './api/updateFelix';
import './UpdateFelix.css';

const UpdateFelixForm: React.FC = (): JSX.Element => {
  const { felixId } = useParams<{ felixId: string }>();
  const location = useLocation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<number>(0);
  const [nationality, setNationality] = useState<string>('');
  const [aboutMe, setAboutMe] = useState<string>(location.state?.aboutMe || ''); // Set initial value from state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFelixData = async (): Promise<void> => {
      try {
        if (!felixId) return;

        const felix: felixResponseModel = await getFelix(felixId);
        setFirstName(felix.firstName);
        setLastName(felix.lastName);
        setAge(felix.age);
        setNationality(felix.nationality);
        setAboutMe(felix.aboutMe); // Ensure this is set correctly
      } catch (error) {
        console.error('Error fetching Felix data:', error);
      }
    };

    fetchFelixData();
  }, [felixId]);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    if (!felixId) {
      alert('Felix ID is missing.');
      return;
    }

    const updatedFelix: felixRequestModel = {
      firstName,
      lastName,
      age,
      nationality,
      aboutMe,
    };

    try {
      await updateFelix(felixId, updatedFelix);
      alert('Felix updated successfully!');
      navigate('/felix'); // Navigate to Felix list or another page
    } catch (error) {
      console.error('Error updating Felix:', error);
      alert('Failed to update Felix.');
    }
  };

  return (
    <div className="update-felix-form">
      <button className="btn-back" onClick={() => navigate(-1)}>Back</button>
      <h2>Update Felix</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="aboutMe">About Me</label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="button btn">Update Felix</button>
      </form>
    </div>
  );
};

export default UpdateFelixForm;
