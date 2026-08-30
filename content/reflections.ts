export type Reflection = {
  slug: string;
  title: string;
  period: string;
  summary: string;
  sections: Array<{ heading: string; paragraphs?: string[]; bullets?: string[] }>;
};

export const reflections: Reflection[] = [
  {
    slug: '2026-08',
    title: '간략히 한 일 정리',
    period: '2026년 8월',
    summary: '그로쓰 어드민 이관, 동의문 플랫폼화, 규제 대응과 개발 구조 정리를 돌아봅니다.',
    sections: [
      { heading: '이번 달에 한 일', bullets: ['그로쓰 어드민을 CRM으로 이관', '서비스 어드민 동의문·약관 플랫폼화 알파 테스트', '단일종목 ETP 규제 대응', 'App Router 폴더 구조와 도메인 경계 정리', 'Orca 터미널로 병렬 작업 환경 구성'] },
      { heading: '돌아보며', paragraphs: ['그로쓰 이벤트를 CRM에서 바로 확인할 수 있게 되었고, 서비스 어드민에서 관리하던 동의문과 약관을 원장과 자동으로 연결하는 작업도 알파 테스트까지 진행했습니다.', '다음 달에는 라이브 출시를 목표로 하고 있습니다. 회사와 학교를 병행하게 된 만큼, 문서화와 개인 프로젝트도 꾸준히 이어가려고 합니다.'] },
    ],
  },
  {
    slug: '2026-07',
    title: '회고',
    period: '2026년 7월',
    summary: '폴링을 SSE로 전환하고, 동의문 플랫폼과 그로쓰 기능을 CRM으로 옮긴 기록입니다.',
    sections: [
      { heading: '엔지니어링 위크', paragraphs: ['키바나 로그를 확인해 보니 CRM 네트워크 요청의 약 70%가 10초·15초 주기의 폴링이었습니다. 서버 개발자와 합의해 이를 Server-Sent Events로 전환했습니다.', 'TDS와 AWS SDK 버전업, 사용하지 않는 파일과 export 제거, App Router 구조 정리도 함께 진행했습니다.'] },
      { heading: '제품을 넓히기', paragraphs: ['원장과 자동으로 연동되는 동의문 관리 플랫폼을 개발하고 보안 QA를 진행했습니다. 별도 백오피스에 있던 그로쓰 이벤트도 CRM으로 옮겨 상담 중 바로 확인할 수 있게 했습니다.', '회사와 학교를 병행하는 새로운 리듬을 앞두고, 다음 커리어와 이력서도 다시 고민하기 시작했습니다.'] },
    ],
  },
  {
    slug: '2026-05',
    title: '4월 회고',
    period: '2026년 5월 기록',
    summary: 'VOC 인사이트와 장애 보상 자동화 프로젝트를 라이브까지 진행한 달입니다.',
    sections: [
      { heading: '제품으로 연결하기', paragraphs: ['상담 STT를 바탕으로 태그를 분류하고 상담 요약과 후처리 내용을 제공하는 VOC 인사이트 기능을 개발했습니다. 보안 검토를 거쳐 라이브에 배포했고, 다음 고도화를 팀과 고민하고 있습니다.', '브로커 매매 장애가 보상 대상인지와 보상 금액을 자동으로 산정하는 MVP도 구현했습니다. 시간대 변환과 소수점 처리처럼 실제 운영에서 발견한 문제를 하나씩 보완하고 있습니다.'] },
      { heading: 'AI를 일하는 방식에 넣기', paragraphs: ['Claude Code 스킬과 동료들이 만든 도구를 활용해 버그를 디버깅하고 큰 기능을 구현하는 흐름을 실험하고 있습니다. 하루하루 회사 일에 최선을 다하는 것의 의미를 다시 생각한 달이었습니다.'] },
    ],
  },
  {
    slug: '2026-04',
    title: '3월 회고',
    period: '2026년 4월 기록',
    summary: '기술적 판단을 조직의 언어로 설명하는 법과 일과 삶의 균형을 고민했습니다.',
    sections: [
      { heading: '설득의 언어', paragraphs: ['1.5M, 3M 리뷰를 마치며 빠른 개발 속도와 여러 어드민을 책임지는 태도는 강점으로, 커뮤니케이션과 업무 공유는 보완할 점으로 돌아봤습니다.', '기술 부채를 청산하거나 새 라이브러리를 도입할 때는 정량적인 임팩트를 측정하고, 왜 필요한지 팀이 판단할 수 있는 언어로 설명해야 한다는 것을 배웠습니다.'] },
      { heading: '나를 알아가는 일', paragraphs: ['자유로운 환경에서 일과 삶을 분리하지 못하고 있다는 걸 느꼈습니다. 올해는 거창한 목표보다 하루하루 최선을 다하고, 내가 어떤 상황에서 보람을 느끼는지 알아가는 사람이 되고 싶습니다.'] },
    ],
  },
  {
    slug: '2026-03',
    title: '26년의 첫 회고',
    period: '2026년 3월',
    summary: '새 팀에서 운영 업무의 비효율을 발견하고, 제품의 방향과 공유의 중요성을 생각했습니다.',
    sections: [
      { heading: '새로운 팀과 제품', paragraphs: ['PS팀에서 Operation Optimization 팀으로 나뉘며 프론트엔드 1명, 백엔드 2명, PM 1명의 작은 팀이 되었습니다. 새 팀의 목표는 수기로 처리되거나 시스템화되지 않은 운영 업무를 효율화하는 것입니다.', 'CRM을 고객 상담만을 위한 제품이 아니라 다양한 운영 업무를 처리하는 공간으로 확장하고 싶습니다.'] },
      { heading: '공유의 중요성', paragraphs: ['프론트엔드 개발자가 혼자일수록 장기적인 관점에서 업무를 쪼개고 예상 시간을 공유하는 일이 중요합니다. 여러 사람이 얽힌 상황에서는 지금의 상황과 의사결정을 빠르게 공유해야 한다는 것을 다시 배웠습니다.'] },
    ],
  },
];

export const archivedReflections = [
  { label: '2022년 회고', href: 'https://khj0426.tistory.com/215' },
  { label: '2023년 회고', href: '/blog/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%20%EC%B7%A8%EC%A4%80%EC%83%9D%EC%9D%98%202023%EB%85%84%20%ED%9A%8C%EA%B3%A0' },
  { label: '2024년 상반기 회고', href: '/blog/%EB%B0%98%EC%98%A4%EC%8B%AD%EC%9D%98%20%EB%B0%98%EC%A0%88' },
  { label: '2024년 회고', href: '/blog/2024%EB%85%84%20%ED%9A%8C%EA%B3%A0' },
  { label: '2025년 상반기 회고 1탄', href: '/blog/2025%20%EC%83%81%EB%B0%98%EA%B8%B0%20%ED%9A%8C%EA%B3%A0-1%ED%83%84' },
  { label: '2025년 상반기 회고 2탄', href: 'https://khj0426.notion.site/2299021512de805eb695e3e7655161f0' },
  { label: '2025년 회고', href: 'https://beaded-menu-418.notion.site/2025-2d5c0ea540f780d6bcbdecada7be9dbf' },
] as const;
