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
    description: '영상통화 기능을 사용하지 않는 상담 팝업에 포함된 SDK를 분리해, 초기 JavaScript를 689kB에서 196kB로 줄였어요.',
    bullets: [
      '빌드 산출물에서 전역 MeetingProvider의 정적 import를 통해 SDK가 포함되는 경로를 확인했어요. Provider를 실제 사용 라우트로 옮기고 헤더·드래그 패널을 동적으로 불러오도록 변경했어요.',
      '변경 후 SDK 청크의 참조 경로와 해당 화면의 First Load JS를 빌드 산출물로 확인했어요.',
    ],
  },
  {
    title: '재연결 후 누락된 상담 메시지 복원',
    description: '네트워크 단절 중 누락된 메시지는 재연결만으로 복구되지 않았어요. 누락된 메시지를 다시 조회·병합해 상담원이 대화를 이어서 확인할 수 있도록 개선했어요.',
    bullets: [
      '마지막 메시지 시각을 기준으로 대화 이력을 조회하고, 메시지 ID로 중복을 제거한 뒤 구독 화면을 갱신했어요. 세션이 사라지거나 조회 결과가 없으면 갱신을 중단했어요.',
    ],
  },
  {
    title: '실시간 상담 지표의 SSE 전달·연결 종료 문제 해결',
    description: '상담 지표를 주기적 조회에서 SSE로 전환하면서 발생한 이벤트 미수신과 연결 종료 문제를 해결했어요.',
    bullets: [
      '압축 여부에 따른 응답을 비교해 Next.js 프록시의 압축 버퍼링이 이벤트 전달을 막는 것을 확인했어요. SSE 전용 Route Handler에서 압축과 버퍼링을 제어해 앱 전체의 압축 설정을 유지하면서 이벤트를 전달하도록 했어요.',
      '브라우저에서 연결을 끊어도 서버 요청이 남아 있어 취소 신호를 프록시의 서버 요청까지 전달했어요. 서버 스트림 종료 처리도 보완하고 종료 오류를 재현하는 회귀 테스트를 추가했어요.',
    ],
  },
  {
    title: '상담 SDK의 이벤트 수신과 업무 로직 분리',
    description: '고객·계좌 조회와 상담 기록 생성 로직을 외부 SDK의 이벤트 수신부에서 분리했어요.',
    bullets: [
      'Amazon Connect Streams/Chat 이벤트를 이벤트버스로 전달하고 업무 로직이 이를 구독하도록 구성했어요. 분리한 업무 로직에 테스트를 작성했어요.',
    ],
  },
  {
    title: 'PR 검증 시간 중앙값 약 24% 단축',
    description: '타입 검사·린트·테스트·빌드가 의존성을 각각 설치하던 CI에 캐시를 적용해, 검사 완료 시간 중앙값을 5분 35초에서 4분 13초로 줄였어요.',
    bullets: [
      '4개 작업에 lockfile 기반 pnpm 캐시를 적용하고 develop 반영 직후 pnpm fetch로 캐시를 미리 채웠어요. Next.js 빌드 캐시도 복원·저장하도록 변경했어요.',
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
    bullets: ['Google Spreadsheet API로 공통 시트의 번역 데이터를 서비스에 반영했어요.'],
  },
];

const devlogDetails: Detail[] = [
  {
    title: '필요한 언어만 불러와 문법 강조 번들 크기 축소',
    description: '코드블록에 쓰이는 언어만 동적으로 불러오도록 바꿔 문법 강조 번들을 666.9KB에서 105.5KB로 줄였어요.',
    bullets: ['Lighthouse에서 Total Blocking Time 문제를 확인하고 next/bundle-analyzer로 react-syntax-highlighter의 번들 비용을 추적했어요. 언어별로 dynamic import하도록 로딩 단위를 나눴어요.'],
  },
  {
    title: '블로그 오류 추적과 자동 성능 검사 도입',
    description: '운영 중 발생하는 오류를 확인하고 페이지 성능을 검사할 수 있도록 Sentry를 도입하고 CI에 Lighthouse 검사를 연결했어요.',
    bullets: [
      'axios 응답 interceptor에서 수집한 오류 정보를 Sentry로 전송했어요. 전체 페이지의 Lighthouse 검사를 CI에서 자동 실행하도록 연결했어요.',
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
        <Experience company="(주)토스증권" period="2025.03 — 현재" role="Operations Optimization Team · Frontend Ops Developer · 계약직 (2025.12 — 현재)" secondaryRole="Product Stability Team · Frontend Developer Assistant · 인턴 (2025.03 — 2025.12)" intro="상담 폼·문서 등록, 개인정보 조회·메뉴별 접근 권한, 기간·태그별 분석과 상담 이력 조회를 구현했어요." details={tossDetails} />
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
