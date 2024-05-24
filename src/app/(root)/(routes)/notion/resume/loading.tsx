'use client';

import Flex from '@/Component/Common/Flex/Flex';
import Skeleton from '@/Component/Common/Skeleton/Skeleton';
import Spinner from '@/Component/Common/Spinner/Spinner';
import useDevice from '@/hooks/useDevice';
import useIsDarkMode from '@/hooks/useIsDarkMode';

export default function NotionResumeLoading() {
  const { isDarkMode } = useIsDarkMode();
  const isMobile = useDevice();
  const pageWrapperBackground = isDarkMode ? '#2f3437' : '#fff';

  if (isMobile) {
    return (
      <Flex
        width={'100vw'}
        height={'100vh'}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner />
      </Flex>
    );
  }
  return (
    <main
      style={{
        width: '720px',
        margin: '0 auto',
      }}
    >
      <Flex
        width={'100%'}
        justifyContent="flex-start"
        alignItems="flex-start"
        flexDirection="column"
        flexWrap="wrap"
        margin={'0 auto'}
        style={{
          background: pageWrapperBackground,
        }}
      >
        <Skeleton.Text
          style={{
            margin: '40px',
          }}
          width={320}
          height={48}
        />
        <Flex
          style={{ padding: '5px ' }}
          justifyContent="space-between"
          flexWrap="wrap"
          width={'100%'}
        >
          <Flex gap={'3px'} flexDirection="column">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton.Text width={350} height={27} key={index} />
            ))}
          </Flex>

          <Skeleton.Text width={120} height={147} />
        </Flex>

        <Flex
          padding={'5px'}
          margin={'50px auto'}
          alignItems="flex-start"
          flexDirection="column"
          width={'100%'}
        >
          <Skeleton.Text width={170} height={30} />

          <Flex gap={'3px'} padding={'5px'} flexDirection="column">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton.Text width={600} height={30} key={index} />
            ))}
          </Flex>

          <Skeleton.Text width={170} height={30} />
          <Flex gap={'3px'} padding={'5px'} flexDirection="column">
            {Array.from({ length: 3 }).map((_, index) => (
              <Flex key={index} justifyContent="space-around" flexWrap="wrap">
                <Flex flexDirection="column">
                  <Skeleton.Text width={200} height={26} />
                  <Skeleton.Text width={200} height={14} />
                </Flex>
                <Flex flexDirection="column">
                  <Skeleton.Text width={400} height={20} />
                  <Skeleton.Text width={400} height={20} />
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </main>
  );
}
