import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';

export default function BlogHomeLoading() {
  return (
    <>
      <Flex width={'68%'} margin={'15px auto'}>
        <Skeleton.Text width={300} height={32} />
      </Flex>

      <main>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton.Card key={index} />
        ))}
      </main>
    </>
  );
}
