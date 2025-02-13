import { Html, useProgress } from '@react-three/drei';

export const LoadingScreen = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <div
        style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          background: 'rgba(0,0,0,0.6)',
          padding: '10px 20px',
          borderRadius: '10px',
        }}
      >
        {Math.round(progress)}% Loading...
      </div>
    </Html>
  );
};
