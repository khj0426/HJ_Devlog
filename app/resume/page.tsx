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
  { label: 'Blog', href: '/' },
  { label: 'LinkedIn', href: 'https://kr.linkedin.com/in/%ED%9A%A8%EC%A4%91-%EA%B9%80-52092625a' },
];

const tossHighlights = [
  '전화·채팅 상담의 고객·계좌 조회부터 기록 생성, 화면 간 동기화까지 개발하고 출시 후 운영 문제를 개선했습니다.',
  '영상통화 SDK의 의존성과 로딩 범위를 분리해 초기 JavaScript를 689kB에서 196kB로 줄였습니다.',
  '네트워크 단절 동안 누락된 상담 메시지를 다시 조회하고 병합해 상담원이 대화를 이어서 확인할 수 있도록 개선했습니다.',
  'Amazon Connect Streams/Chat 이벤트를 이벤트버스로 추상화하고 고객·계좌 조회 및 기록 생성 로직과 분리해 테스트 가능하게 만들었습니다.',
  'lockfile 기반 pnpm 캐시와 Next.js 빌드 캐시를 CI에 적용해 검사 완료 시간 중앙값을 5분 35초에서 4분 13초로 줄였습니다.',
  '상담 지표 조회를 SSE로 전환하며 Next.js Route Handler 프록시, 압축 버퍼링, 요청 취소와 연결 종료 오류를 해결했습니다.',
  'Zod·React Hook Form 기반의 복합 상담 폼과 단계형 문서 등록 화면의 상태·저장·단계 이동 책임을 분리했습니다.',
  '마스킹 여부와 조회 사유를 Query context와 queryKey에 연결해 개인정보 조회 조건을 요청과 캐시에 일관되게 적용했습니다.',
  '조직 권한과 회원·계좌 유형에 따른 화면 분기를 공통 가드와 선언적 컴포넌트로 정리했습니다.',
  'visx 기반 상담 분석 차트와 이력 조회를 연결하고 Error Boundary로 상담·STT 영역의 오류를 격리했습니다.',
];

const upsiteHighlights = [
  '2개 프로젝트가 공유하는 UI를 비공개 npm 패키지로 분리하고 GitHub Packages와 Changesets로 배포를 자동화했습니다.',
  'Storybook을 AWS S3에 배포해 디자이너와 컴포넌트 단위로 QA할 수 있는 흐름을 구축했습니다.',
  'Google Spreadsheet API를 연결해 비개발자가 공통 시트에서 번역 문구를 관리하도록 개선했습니다.',
];

const devlogHighlights = [
  '필요한 언어만 동적으로 불러와 코드 하이라이터 번들을 666.9KB에서 105.5KB로 줄였습니다.',
  '오류 추적, Lighthouse CI, 검색·공유 지표, sitemap·RSS·동적 OpenGraph 이미지를 블로그에 연결했습니다.',
  'Next.js와 MDX를 사용해 기존 URL을 유지하면서 기술 글을 정적 페이지로 운영하고 있습니다.',
];

export default function ResumePage() {
  return (
    <article className="resume pb-8 pt-12">
      <header className="border-b border-gray-200 pb-10 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-zinc-400">Frontend Developer</p>
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100 sm:text-4xl">김효중</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
          실제로 쓰이는 제품을 만들고, 복잡한 문제를 예측 가능한 구조로 바꾸는 프론트엔드 개발자입니다.
        </p>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-zinc-400">
          3개 조직이 사용하는 토스증권 고객상담 시스템의 개발부터 출시와 운영까지 참여했습니다.
          하루 2,000건의 실시간 상담을 처리하는 제품을 개선하고 있습니다.
        </p>
        <nav aria-label="연락처" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {contactLinks.map(({ label, href }) => (
            <LinkOrAnchor key={label} label={label} href={href} />
          ))}
        </nav>
      </header>

      <ResumeSection title="Experience">
        <Experience company="토스증권" role="Operations Optimization Team · Frontend Ops Developer · 계약직" period="2025.12 — 현재" skills="Next.js · React · TypeScript · TanStack Query · visx" highlights={tossHighlights} />
        <Experience company="토스증권" role="Product Stability Team · Frontend Developer Assistant · 인턴" period="2025.03 — 2025.12" skills="Next.js · React · TypeScript · Zod · React Hook Form" highlights={['고객상담 시스템의 핵심 기능과 공통 컴포넌트를 개발하고, 출시 후 운영 안정화와 성능 개선을 진행했습니다.']} />
        <Experience company="업사이트" role="Frontend Developer · 인턴" period="2024.08 — 2024.12" skills="React · TypeScript · Storybook · GitHub Packages" highlights={upsiteHighlights} />
      </ResumeSection>

      <ResumeSection title="Project">
        <Project title="HJ Devlog" period="2023.06 — 현재" skills="Next.js · MDX · TypeScript" highlights={devlogHighlights} links={[{ label: 'Blog', href: '/' }, { label: 'Source', href: 'https://github.com/khj0426/HJ_Devlog' }]} />
      </ResumeSection>

      <ResumeSection title="Activity">
        <SimpleEntry title="프로그래머스 데브코스" period="2023.06 — 2023.12">
          팀 프로젝트 2회와 멘토·동료 코드 리뷰에 참여하며 프론트엔드 제품 개발을 학습했습니다.
        </SimpleEntry>
      </ResumeSection>

      <p className="resume-back mt-12 text-sm text-gray-500 dark:text-zinc-500">
        <Link href="/" className="underline underline-offset-4 hover:text-blue-500">← 블로그로 돌아가기</Link>
      </p>
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

function Experience({ company, role, period, skills, highlights }: { company: string; role: string; period: string; skills: string; highlights: string[] }) {
  return <div className="resume-entry"><EntryHeader title={company} subtitle={role} period={period} /><p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">{skills}</p><ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div>;
}

function Project({ title, period, skills, highlights, links }: { title: string; period: string; skills: string; highlights: string[]; links: { label: string; href: string }[] }) {
  return <div className="resume-entry"><EntryHeader title={title} period={period} /><p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">{skills}</p><ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">{highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul><div className="mt-4 flex gap-4 text-sm">{links.map((link) => <LinkOrAnchor key={link.label} {...link} />)}</div></div>;
}

function SimpleEntry({ title, period, children }: { title: string; period: string; children: React.ReactNode }) {
  return <div className="resume-entry"><EntryHeader title={title} period={period} /><p className="mt-2 leading-relaxed text-gray-700 dark:text-zinc-300">{children}</p></div>;
}

function EntryHeader({ title, subtitle, period }: { title: string; subtitle?: string; period: string }) {
  return <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline"><div><h3 className="text-lg font-medium text-gray-950 dark:text-zinc-100">{title}</h3>{subtitle && <p className="mt-1 text-gray-700 dark:text-zinc-300">{subtitle}</p>}</div><span className="text-sm text-gray-500 dark:text-zinc-500">{period}</span></div>;
}
