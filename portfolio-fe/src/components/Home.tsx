import React, { useState, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const MatrixColumn: React.FC<{ index: number; matrixDestroyed: boolean }> = memo(({ index, matrixDestroyed }) => {
  const gamingIcons = ['⚔️', '⭐'];
  const randomIcons = Array.from({ length: 20 }, () =>
      gamingIcons[Math.floor(Math.random() * gamingIcons.length)]
  ).join('');

  return (
      <div
          className={`matrixColumn ${matrixDestroyed ? 'destroyed' : ''}`}
          style={{
            left: `${index * 3.5}%`,
            '--delay': Math.random(),
          } as React.CSSProperties}
      >
        {randomIcons.split('').map((char, idx) => (
            <span key={idx}>{char}</span>
        ))}
      </div>
  );
});

const MatrixRain: React.FC<{ matrixDestroyed: boolean }> = memo(({ matrixDestroyed }) => {
  const columns = [];
  for (let i = 0; i < 30; i++) {
    columns.push(<MatrixColumn key={i} index={i} matrixDestroyed={matrixDestroyed} />);
  }
  return <div className="matrixRain">{columns}</div>;
});

export const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [matrixDestroyed, setMatrixDestroyed] = useState(false);
  const fullText = 'Feelix Zhang';
  const typedLengthRef = useRef(0); // Use a ref to track typed length independently

  const navigate = useNavigate();

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (typedLengthRef.current < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(typedLengthRef.current));
        typedLengthRef.current++; // Increment the ref to track typing index
      } else {
        clearInterval(typingInterval);
      }
    }, 150); // Controls typing speed

    return () => clearInterval(typingInterval); // Cleanup on unmount
  }, [fullText]);

  const handleEnterClick = () => {
    setMatrixDestroyed(true);
    setTimeout(() => {
      navigate('/felix');
    }, 1000);
  };

  return (
      <main className="homePage">
        <MatrixRain matrixDestroyed={matrixDestroyed} />

        <div className="welcomeText">
          <h1 className="typing">{typedText}</h1>
          <p className="paragraph">Welcome to my Portfolio</p>
          <button className="button" onClick={handleEnterClick}>
            Enter Portfolio
          </button>
        </div>
      </main>
  );
};