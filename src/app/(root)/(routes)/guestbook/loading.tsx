import Skeleton from '@/Component/Common/Skeleton/Skeleton';

import './index.css';
export default function Loading() {
  return (
    <div className="loading_container">
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          style={{
            padding: '10px',
          }}
        >
          <Skeleton.Text
            height={50}
            className="loading_skeleton"
            style={{
              display: 'flex',
              width: '80%',
            }}
          />
        </div>
      ))}
    </div>
  );
}
