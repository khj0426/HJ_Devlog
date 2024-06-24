import Flex from '@/Component/Common/Flex/Flex';
import Spinner from '@/Component/Common/Spinner/Spinner';
export default function BackOfficeLoading() {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      width={'100%'}
      height={'100vh'}
    >
      <Spinner />
    </Flex>
  );
}
