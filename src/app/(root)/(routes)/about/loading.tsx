import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
export default function AboutLoading() {
  return (
    <main>
      <Flex flexDirection="column" flexWrap="wrap" margin={'0 auto'}>
        <Skeleton.Text width={350} height={25} />
        <Flex justifyContent="center" gap={'25px'} flexWrap="wrap">
          <Skeleton.Text width={300} height={300} />
          <Flex flexDirection="column" gap={'5px'}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton.Text key={index} width={300} height={20} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
