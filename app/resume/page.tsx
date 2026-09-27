import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resume',
  description: '프론트엔드 개발자 김효중의 경력과 프로젝트',
  alternates: { canonical: '/resume' },
};

const contactLinks = [
  { label: 'Email', href: 'mailto:706shin1728@naver.com' },
  { label: 'GitHub', href: 'https://github.com/khj0426' },
  { label: '블로그', href: '/' },
  { label: 'LinkedIn', href: 'https://kr.linkedin.com/in/%ED%9A%A8%EC%A4%91-%EA%B9%80-52092625a' },
];

type Detail = { title: string; description?: string; bullets?: string[] };

const tossDetails: Detail[] = [
  {
    title: '상담 팝업의 초기 JavaScript 71.6% 감소',
    description: '영상통화 기능을 사용하지 않는 상담 팝업에도 SDK가 포함되어 있었어요. 의존성과 로딩 범위를 분리해 초기 JavaScript를 689kB에서 196kB로 줄였어요.',
    bullets: [
      '빌드 산출물에서 전역 MeetingProvider의 정적 import를 따라 SDK가 포함되는 경로를 확인했어요. Provider를 실제 사용 라우트의 layout으로 옮기고, 헤더·드래그 패널은 next/dynamic으로 나눠 필요한 화면에서 불러오도록 했어요.',
      '데이터 조회 중에도 children은 렌더링하고 context만 null로 제공해 화면 표시와 데이터 대기를 분리했어요. 데이터 영역의 fallback을 유지한 상태에서 SDK 청크의 참조 경로와 First Load JS 변화를 빌드 산출물로 확인했어요.',
    ],
  },
  {
    title: '네트워크가 끊긴 동안 누락된 대화 복원',
    description: '재연결만으로는 돌아오지 않는 메시지를 다시 조회하고 병합해, 상담원이 누락된 대화를 이어서 확인할 수 있도록 개선했어요.',
    bullets: [
      '마지막 메시지 시각을 기준으로 getTranscript를 순방향·오름차순 조회했어요. 이미 받은 메시지 ID를 Set에 담아 중복을 제거하고, 목록을 병합한 뒤 구독 화면을 갱신했어요. 세션이 사라지거나 조회 결과가 없으면 갱신을 중단했어요.',
    ],
  },
  {
    title: '상담 SDK의 이벤트 수신과 업무 로직 분리',
    description: '외부 SDK의 이벤트 수신과 고객·계좌 조회, 기록 생성 로직을 분리하고 여러 탭 사이의 상담 상태를 동기화했어요.',
    bullets: ['Amazon Connect Streams/Chat 이벤트를 이벤트버스로 전달하고 업무 로직이 이를 구독하도록 구성했어요. 분리한 업무 로직에 테스트를 작성했어요.'],
  },
  {
    title: 'PR 검증 시간 중앙값 약 24% 단축',
    bullets: [
      '타입 검사·린트·테스트·빌드가 같은 의존성을 각각 설치해 PR 검증이 지연됐어요. lockfile 변경 직후에는 새 캐시를 채우는 시간도 필요했어요.',
      'lockfile 기반 pnpm 캐시를 4개 작업에 적용하고, develop 반영 직후 pnpm fetch로 미리 채웠어요. Next.js 빌드 캐시도 복원·저장하도록 바꾼 뒤, 검사 완료 시간 중앙값이 5분 35초에서 4분 13초로 줄었어요.',
    ],
  },
  {
    title: 'SSE 전환 과정에서 발생한 프록시·연결 종료 문제 해결',
    description: '주기적으로 조회하던 상담 지표를 SSE로 전환하면서, 브라우저·Next.js 프록시·서버 사이에서 발생한 데이터 미수신과 연결 종료 문제를 추적했어요.',
    bullets: [
      '연결됐지만 이벤트가 오지 않는 문제. HTTP 200 응답 뒤에도 onmessage가 호출되지 않았어요. curl로 gzip과 identity 요청을 비교해 Next.js rewrite 경유 시 압축 버퍼링이 이벤트 전달을 막는 것을 확인했어요. SSE만 Route Handler로 분리하고 Accept-Encoding: identity와 버퍼링 방지 헤더를 적용해, 앱 전체의 압축 설정을 유지하면서 데이터를 전달하도록 했어요.',
      '운영 환경에서 발생한 403·404 오류. 프록시가 요청 헤더를 다시 구성하면서 X-Forwarded-For를 누락해, 접근 제어에서 클라이언트 대신 프록시의 내부 IP를 검사하고 있었어요. 수신 요청에 해당 헤더가 있을 때만 서버 요청에 전달하도록 수정했어요.',
      '브라우저에서 끊어도 남아 있는 서버 연결. 클라이언트는 150초마다 SSE 연결을 교체했지만 프록시의 fetch에는 취소 신호가 연결돼 있지 않았어요. request.signal을 서버 요청에도 전달하고, 클라이언트 취소 시 같은 신호가 중단되는지 테스트했어요.',
      '서버의 연결 종료가 프록시 오류로 번지는 문제. 서버 스트림이 먼저 닫힐 때 Next.js의 응답 전달 오류로 기록됐어요. reader를 감싼 ReadableStream에서 요청 취소와 terminated·other side closed 오류는 close로 처리하고, 나머지 오류는 error로 전달했어요. 종료 오류를 재현하는 회귀 테스트도 추가했어요.',
    ],
  },
  {
    title: '상담 폼의 입력·저장 상태와 문서 등록 단계 관리',
    description: '복합 입력과 동적 필드를 가진 상담 폼, 여러 단계를 거치는 문서 등록 화면의 상태를 역할별로 분리했어요.',
    bullets: [
      '상담 폼은 Zod 스키마와 React Hook Form을 연결하고 Controller·useFieldArray로 입력을 관리했어요. 저장 응답을 해당 상담의 Query cache에 반영한 뒤 목록·상세를 갱신하고, 상담 ID·서버 데이터 변경에 맞춰 폼을 reset했어요.',
      '문서 등록 화면은 단계 구성·순서·초기 단계·이동 조건을 별도 컴포넌트와 훅으로 분리했어요. 페이지에는 입력 상태와 자동 저장·최종 저장·취소 처리를 남겨, 단계 변경과 저장 로직을 따로 수정할 수 있도록 했어요.',
    ],
  },
  {
    title: '개인정보 조회 조건을 요청과 캐시에 일관되게 적용',
    description: '마스킹 여부와 조회 사유를 화면마다 따로 처리하지 않도록 공통 조회 훅에 연결했어요.',
    bullets: [
      'useQuery·useSuspenseQuery를 확장해 queryFn 실행 시 마스킹 여부를 Query context의 헤더 메타데이터에 전달했어요. 고객 조회의 queryKey와 함수 인자에도 검색 조건·마스킹 여부·사유를 포함해 서로 다른 조건의 결과를 구분했어요.',
      '기존 MaskProvider·useMaskContext의 상태를 조회 입력에 연결했어요. 검색어가 없을 때는 enabled로 요청을 막고 자동 재조회 여부를 명시해, 화면과 조회 동작에 같은 정책을 적용했어요.',
    ],
  },
  {
    title: '메뉴별 접근 권한과 고객 유형별 화면 분기 통합',
    description: '메뉴별 접근 권한과 고객 유형별 화면 분기를 상위에서 처리하도록 정리했어요.',
    bullets: ['route-permissions에 메뉴별 허용 조직을 매핑하고 공통 훅·가드와 403 안내 화면을 연결했어요. 회원 상태·계좌 유형에 따른 화면 선택은 상위 SwitchCase로 옮겨 하위 페이지에 흩어진 조건문을 정리했어요.'],
  },
  {
    title: '공통 테이블 확장과 브라우저 전용 UI 렌더링 처리',
    description: '화면마다 다른 헤더를 지원하면서 기존 테이블 사용처의 동작을 유지하고, 브라우저 전용 UI의 렌더링 시점을 구분했어요.',
    bullets: [
      '공통 ListTable에 renderHeader 확장 지점을 추가하고, 지정하지 않으면 기존 columns 헤더를 사용하도록 했어요. 커스텀 헤더가 우선하는 동작을 테스트해 하위 호환성을 확인했어요.',
      'ClientGate에는 useSyncExternalStore의 서버·브라우저 snapshot을 적용했어요. 서버와 초기 hydration에서는 같은 null을 반환하고 이후 children을 렌더링해, 브라우저 전용 UI의 표시 시점을 공통으로 처리했어요.',
    ],
  },
  {
    title: '상담 통계에서 같은 조건의 상담 이력으로 이동하는 기능 구현',
    description: '요약 지표를 확인한 뒤 같은 조건의 상담 원본까지 살펴볼 수 있도록 분석 화면과 이력 조회를 연결했어요.',
    bullets: [
      '날짜 구간·전화/채팅 집계·이전 기간 증감률·차트 데이터 변환을 함수로 분리했어요. visx로 기간별 건수와 태그의 14일 추이를 표시하고, 상담·음성 인식(STT) 영역은 Error Boundary로 나눠 오류를 격리했어요.',
      '함께 나타난 태그의 건수·비율을 조회하고, 선택한 태그 조합으로 필터링된 상담 이력으로 이동하도록 구현했어요. 로딩·빈 결과·날짜 미선택 상태도 구분했어요.',
    ],
  },
];

const upsiteDetails: Detail[] = [
  {
    title: '2개 프로젝트가 공유하는 UI 패키지와 배포 흐름 구축',
    description: '프로젝트마다 중복 구현하던 UI를 비공개 npm 패키지로 분리하고, 공통 컴포넌트의 버전 관리와 배포를 자동화했어요.',
    bullets: ['GitHub Packages로 디자인 시스템을 배포하고 Changesets로 변경 사항과 버전을 관리했어요. Storybook을 AWS S3에 배포해 디자이너와 실제 컴포넌트 단위로 QA했어요.'],
  },
  {
    title: '비개발자가 시트에서 번역 문구를 관리하도록 개선',
    description: '개발자가 번역 JSON을 수정하던 흐름을 바꿔, 비개발자가 공통 시트에서 서비스 문구를 직접 관리하도록 개선했어요.',
    bullets: ['Google Spreadsheet API로 시트의 번역 데이터를 서비스에 반영했어요.'],
  },
  {
    title: '작업일보의 동적 입력 필드 구현',
    description: 'React Hook Form·useFieldArray로 작업일보의 필드 추가·삭제와 입력 상태를 함께 관리했어요.',
  },
];

const devlogDetails: Detail[] = [
  {
    title: '필요한 언어만 불러와 문법 강조 번들 크기 축소',
    description: '코드블록에 쓰이는 언어만 동적으로 불러오도록 바꿔 문법 강조 번들을 666.9KB에서 105.5KB로 줄였어요.',
    bullets: ['Lighthouse에서 Total Blocking Time 문제를 확인하고 next/bundle-analyzer로 react-syntax-highlighter의 번들 비용을 추적했어요. 언어별로 dynamic import하도록 로딩 단위를 나눴어요.'],
  },
  {
    title: '블로그 오류 추적·성능 검사와 검색 노출·방문 통계 관리',
    description: '직접 만든 블로그에 오류 추적과 자동 성능 검사를 연결하고, 검색·공유와 방문 지표까지 관리했어요.',
    bullets: [
      'axios 응답 interceptor에서 수집한 오류 정보를 Sentry로 전송했어요. 전체 페이지의 Lighthouse 검사를 CI에서 자동 실행하도록 연결했어요.',
      '직접 만든 UI를 Storybook으로 문서화하고, 자동 목차는 Intersection Observer로 구현했어요. Next.js metadata 기반 sitemap을 Search Console에 등록하고 RSS·동적 OpenGraph 이미지를 제공했어요.',
      'GA의 pageLocation·totalUsers로 페이지별 사용자 수를 표시하고, Recharts로 방문자 수·참여 시간·세션당 페이지 수를 시각화했어요.',
    ],
  },
];

export default function ResumePage() {
  return (
    <article className="resume pb-8 pt-12">
      <header className="border-b border-gray-200 pb-10 dark:border-zinc-800">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-start gap-5">
            <Image src="/images/Profile.jpg" alt="김효중" width={80} height={80} className="h-20 w-20 rounded-full object-cover" priority />
            <div>
              <h1 className="m-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100">김효중</h1>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">Frontend Developer</p>
            </div>
          </div>
          <nav aria-label="연락처" className="flex flex-col items-end gap-1 text-sm">
            {contactLinks.map(({ label, href }) => <LinkOrAnchor key={label} label={label} href={href} />)}
          </nav>
        </div>
        <div className="mt-8 space-y-4 leading-relaxed text-gray-700 dark:text-zinc-300">
          <p>3개 조직이 사용하고 하루 2,000건의 상담을 처리하는 토스증권 고객상담 시스템의 프론트엔드 개발·출시·운영에 참여했어요.</p>
          <p>고객·계좌 조회, 상담 기록 생성과 화면 간 상태 동기화를 구현하고, 초기 로딩 비용과 실시간 상담 중 발생하는 문제를 개선했어요.</p>
        </div>
      </header>

      <ResumeSection title="경력">
        <Experience company="(주)토스증권" period="2025.03 — 현재" role="Operations Optimization Team · Frontend Ops Developer · 계약직 (2025.12 — 현재)" secondaryRole="Product Stability Team · Frontend Developer Assistant · 인턴 (2025.03 — 2025.12)" intro="전화·채팅 상담의 고객·계좌 조회부터 기록 생성, 화면 간 동기화까지 개발하고 출시 후 운영 문제를 개선했어요." details={tossDetails} />
        <Experience company="(주)업사이트" period="2024.08 — 2024.12" role="Frontend Developer · 인턴 · 서울 청년 예비인턴" details={upsiteDetails} />
      </ResumeSection>

      <ResumeSection title="개인 프로젝트">
        <Project title="HJ-Devlog" period="2023.06 — 현재" subtitle="개인 블로그 · Next.js · React · TypeScript" details={devlogDetails} links={[{ label: 'Blog', href: '/' }, { label: 'Source', href: 'https://github.com/khj0426/HJ_Devlog' }]} />
      </ResumeSection>

      <ResumeSection title="교육 · 활동">
        <SimpleEntry title="프로그래머스 데브코스" period="2023.06 — 2023.12">팀 프로젝트 2회, 멘토·동료 코드 리뷰에 참여했어요.</SimpleEntry>
      </ResumeSection>

      <p className="resume-back mt-12 text-sm text-gray-500 dark:text-zinc-500"><Link href="/" className="underline underline-offset-4 hover:text-blue-500">← 블로그로 돌아가기</Link></p>
    </article>
  );
}

function LinkOrAnchor({ label, href }: { label: string; href: string }) {
  const className = 'underline decoration-gray-300 underline-offset-4 transition-colors hover:text-blue-500 dark:decoration-zinc-700';
  if (href.startsWith('/')) return <Link href={href} className={className}>{label}</Link>;
  return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={className}>{label}</a>;
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="border-b border-gray-200 py-10 last:border-0 dark:border-zinc-800"><h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-500">{title}</h2><div className="space-y-10">{children}</div></section>;
}

function Experience({ company, period, role, secondaryRole, intro, details }: { company: string; period: string; role: string; secondaryRole?: string; intro?: string; details: Detail[] }) {
  return <div className="resume-entry"><EntryHeader title={company} period={period} /><p className="mt-2 text-sm text-gray-700 dark:text-zinc-300">{role}</p>{secondaryRole && <p className="mt-1 text-sm text-gray-700 dark:text-zinc-300">{secondaryRole}</p>}{intro && <p className="mt-5 leading-relaxed text-gray-700 dark:text-zinc-300">{intro}</p>}<div className="mt-6 space-y-7">{details.map((detail) => <DetailBlock key={detail.title} detail={detail} />)}</div></div>;
}

function Project({ title, period, subtitle, details, links }: { title: string; period: string; subtitle: string; details: Detail[]; links: { label: string; href: string }[] }) {
  return <div className="resume-entry"><EntryHeader title={title} period={period} /><p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">{subtitle}</p><div className="mt-6 space-y-7">{details.map((detail) => <DetailBlock key={detail.title} detail={detail} />)}</div><div className="mt-5 flex gap-4 text-sm">{links.map((link) => <LinkOrAnchor key={link.label} {...link} />)}</div></div>;
}

function DetailBlock({ detail }: { detail: Detail }) {
  return <div><h3 className="border-l-3 border-gray-800 pl-3 text-lg font-semibold text-gray-900 dark:border-zinc-300 dark:text-zinc-100">{detail.title}</h3>{detail.description && <p className="mt-2 leading-relaxed text-gray-700 dark:text-zinc-300">{detail.description}</p>}{detail.bullets && <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</div>;
}

function SimpleEntry({ title, period, children }: { title: string; period: string; children: React.ReactNode }) {
  return <div className="resume-entry"><EntryHeader title={title} period={period} /><p className="mt-2 leading-relaxed text-gray-700 dark:text-zinc-300">{children}</p></div>;
}

function EntryHeader({ title, period }: { title: string; period: string }) {
  return <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"><h3 className="text-xl font-semibold text-gray-950 dark:text-zinc-100">{title}</h3><span className="text-sm text-gray-500 dark:text-zinc-500">{period}</span></div>;
}
