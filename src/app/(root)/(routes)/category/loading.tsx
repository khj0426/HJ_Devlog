import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
export default function CategoryLoading() {
  return (
    <>
      <Skeleton.Text
        variant="text"
        width={350}
        height={40}
        style={{
          margin: '0 auto',
        }}
      ></Skeleton.Text>
      <main>
        <Flex
          justifyContent="center"
          flexWrap="wrap"
          width={'80%'}
          margin={'0 auto'}
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton.Card key={index} />
          ))}
        </Flex>

        <Flex justifyContent="center" gap={'2px'} width={'100%'}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton.Text
              width={50}
              height={50}
              variant="rectangular"
              key={index}
            />
          ))}
        </Flex>
      </main>
    </>
  );
}
