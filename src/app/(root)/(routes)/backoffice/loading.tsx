import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
import Spinner from '@/Component/Common/Spinner/Spinner';

export default function BackOfficeLoading() {
  return (
    <Flex flexDirection="column" alignItems="flex-start" width={'80%'}>
      <Flex width={'100%'} justifyContent="flex-start">
        <Skeleton.Text width={170} height={50}></Skeleton.Text>
      </Flex>
      <Flex
        flexWrap="wrap"
        width={'100%'}
        justifyContent="space-around"
        alignItems="center"
      >
        <Skeleton.Text width={300} height={150}></Skeleton.Text>
        <Skeleton.Text width={550} height={400}></Skeleton.Text>
      </Flex>
    </Flex>
  );
}
