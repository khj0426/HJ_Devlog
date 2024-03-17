import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
export default function AboutLoading() {
  return (
    <main>
      <Flex width={'80%'} flexDirection="column">
        <Skeleton.Text width={350} height={25} />
        <Flex justifyContent="center" gap={'25px'} flexWrap="wrap">
          <Skeleton.Image
            alt="About 프로필 이미지 스켈레톤"
            src="/images/Profile.jpg"
            width={300}
            height={300}
          />
          <Skeleton.Text width={300} height={400} />
        </Flex>
      </Flex>
    </main>
  );
}
