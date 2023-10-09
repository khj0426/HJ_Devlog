'use client';

import type AboutProps from '@/@types/AboutProps';

import styled from 'styled-components';

import Content from '@/Component/About/Content';
import ProfileImageWrapper from '@/Component/About/ProfileImgWrapper';
import Title from '@/Component/About/Title';

const AboutContent: AboutProps = {
  title: '안녕하세요! 기록하기를 좋아하는 김효중입니다!',
  imgurl: '/images/Profile.jpg',
  content: [
    '항상 성장하고 싶은 개발자가 꿈인 김효중입니다!',
    '최근에는 프로그래머스 데브코스에서 열정 넘치는 분들과 함께 열심히 학습을 이어가고 있어요',
    '좋은 코드가 어떤 코드인지 아직 잘 모르지만, 열심히 배워가고 싶어요!',
    '최근에는 Next.js와 함수형 프로그래밍을 공부하고 있습니다.',
    '운동부족을 느껴서 열심히 여러 운동중을 찍먹 중입니다. 최근에는 클라이밍을 찍먹했어요.',
  ],
};

const StyledContentLayOut = styled.article`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 25px;
  flex-wrap: wrap;
`;

export default function About() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '80%',
      }}
    >
      <Title title={AboutContent.title} />
      <StyledContentLayOut>
        <ProfileImageWrapper imgurl={AboutContent.imgurl} />
        <Content content={AboutContent.content} />
      </StyledContentLayOut>
    </main>
  );
}
