import Spinner from '@/Component/Common/Spinner';

export default function NotionResumeLoading() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Spinner timing={1} />
    </div>
  );
}
