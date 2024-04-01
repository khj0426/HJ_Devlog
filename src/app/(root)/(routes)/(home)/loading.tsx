import Skeleton from '@/Component/Common/Skeleton/Skeleton';

export default function BlogHomeLoading() {
  return (
    <main>
      {Array.from({ length: 20 }).map((_, index) => (
        <Skeleton.Card key={index} />
      ))}
    </main>
  );
}
