import type { AboutProps } from '@/@types/AboutProps'

import Content from '@/Component/About/Content'
import ProfileImageWrapper from '@/Component/About/ProfileImgWrapper'
import Title from '@/Component/About/Title'
import Flex from '@/Component/Common/Flex/Flex'
const AboutContent: AboutProps = {
    title: '안녕하세요! 항상 팀에 기여하고 싶은 개발자 김효중입니다',
    imgurl: '/images/Profile.jpg',
    content: ['새로운 기술이 왜 등장했고, 어떤 문제를 해결하는 지 공부하는 것에 즐거움을 느낍니다', '몰입할 수 있는 환경에서 개발하는 것을 즐깁니다', '기록하면서 공부할 때 가장 성취감을 느낍니다.항상 제가 배운 내용을 기록하고자 합니다.', '항상 소속된 팀에서 작은 것들이라도 기여하는 사람이 되고 싶습니다'],
}

export default async function About() {
    return (
        <main
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '80%',
            }}
        >
            <Title
                title={AboutContent.title}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            />
            <article
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '70%',
                    gap: '5px',
                    padding: '0',
                    margin: '0 auto',
                    flexWrap: 'wrap',
                }}
            >
                <ProfileImageWrapper imgurl={AboutContent.imgurl} />
                <Content content={AboutContent.content} />
                <br />
                <Flex flexDirection="column" alignItems="flex-start" margin={'0 auto'} width={'100%'}>
                    <h2>Skill</h2>
                    <p
                        style={{
                            fontWeight: 'bold',
                        }}
                    >
                        React,Next.js,Typescript
                    </p>
                    <h2>Experiences</h2>
                    <Flex
                        flexDirection="column"
                        gap="5px"
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        style={{
                            fontWeight: '500',
                            fontSize: '14px',
                        }}
                    >
                        <span>2023.06~2023.12 프로그래머스 웹 데브코스 4기</span>
                        <span>2024.01 ~ 멋쟁이사자처럼 SKHU 프론트엔드 운영진</span>
                        <span>2022.08~2023.06 GDSC SKHU 프론트엔드 파트</span>
                    </Flex>
                </Flex>
            </article>
        </main>
    )
}
