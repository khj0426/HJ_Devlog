import { SkeletonCard } from '@/Component/Common/Skeleton/Card';
export default function Loading() {
  return (
    <main
      style={{
        minWidth: '65%',
        maxWidth: '70%',
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
      }}
    >
      {Array.from({ length: 12 }).map((_, index) => {
        return <SkeletonCard key={index} />;
      })}
    </main>
  );
}
