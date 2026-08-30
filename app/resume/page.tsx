import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resume',
  description: '프론트엔드 개발자 김효중의 경력과 프로젝트',
  alternates: { canonical: '/resume' },
};

const links = [
  { label: 'Email', href: 'mailto:706shin1728@naver.com' },
  { label: 'GitHub', href: 'https://github.com/khj0426' },
  {
    label: 'LinkedIn',
    href: 'https://kr.linkedin.com/in/%ED%9A%A8%EC%A4%91-%EA%B9%80-52092625a',
  },
];

const productStabilityHighlights = [
  '3개 조직이 사용하는 고객상담 시스템을 출시하고 운영하며 전화·채팅 상담의 전체 흐름을 설계했습니다.',
  'Amazon Connect 이벤트를 이벤트 버스 패턴으로 추상화하고, 핵심 상담 로직에 테스트를 구축해 외부 SDK 의존성과 변경 위험을 낮췄습니다.',
  'useMaskableQuery와 MaskProvider를 설계해 민감 정보의 마스킹 상태와 해제 사유를 일관된 인터페이스로 관리했습니다.',
  '조직·회원·계좌 유형에 따른 복잡한 권한과 화면 분기를 가드 및 선언적 컴포넌트로 정리했습니다.',
  'ListTable, ClientGate 같은 공통 컴포넌트와 린트·포맷 환경을 구축해 팀의 반복 작업을 줄였습니다.',
];

const operationHighlights = [
  '상담 데이터와 STT를 기반으로 상담 대시보드, STT 조회, 태그별 분석 기능을 개발했습니다.',
  'visx 기반 차트를 독립적인 영역으로 구성하고 에러 바운더리를 분리해 부분 장애가 전체 화면으로 전파되지 않게 했습니다.',
  'GitHub Packages와 Storybook 기반의 사내 디자인 시스템을 구축하고 Changesets로 버전 관리와 배포를 자동화했습니다.',
  'Google Spreadsheet API를 연결해 비개발자도 번역을 수정할 수 있는 다국어 관리 흐름을 만들었습니다.',
];

export default function ResumePage() {
  return (
    <article className="resume pb-8 pt-12">
      <header className="border-b border-gray-200 pb-10 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium text-gray-500 dark:text-zinc-400">
          Frontend Engineer
        </p>
        <h1 className="m-0 text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100 sm:text-4xl">
          김효중
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-zinc-300">
          실제로 쓰이는 제품을 만들고, 복잡한 문제를 예측 가능한 구조로 바꾸는
          프론트엔드 개발자입니다.
        </p>
        <p className="mt-4 leading-relaxed text-gray-600 dark:text-zinc-400">
          3개 조직이 사용하는 토스증권 고객상담 시스템의 개발부터 출시와 운영까지
          참여했습니다. 현재 월 40,000건의 실시간 상담을 처리하는 제품을 개선하고
          있습니다.
        </p>
        <nav aria-label="연락처" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="underline decoration-gray-300 underline-offset-4 transition-colors hover:text-blue-500 dark:decoration-zinc-700"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <ResumeSection title="Experience">
        <Experience
          company="토스증권"
          role="Operation Optimizations Team"
          period="2025.12 — 현재"
          skills="Next.js · React · TypeScript · TanStack Query · visx"
          highlights={operationHighlights}
        />
        <Experience
          company="토스증권"
          role="Product Stability Team"
          period="2025.03 — 2025.12"
          skills="Next.js · React · TypeScript · Zod · React Hook Form"
          highlights={productStabilityHighlights}
        />
      </ResumeSection>

      <ResumeSection title="Project">
        <div className="resume-entry">
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <h3 className="text-lg font-medium text-gray-950 dark:text-zinc-100">HJ Devlog</h3>
            <span className="text-sm text-gray-500 dark:text-zinc-500">2023.06 — 현재</span>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">Next.js · MDX · TypeScript</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">
            <li>65개의 기술 글을 기존 URL을 유지한 채 정적 MDX 페이지로 마이그레이션했습니다.</li>
            <li>필요한 언어만 불러오도록 코드 하이라이터를 개선해 관련 번들을 666.9KB에서 105.5KB로 줄였습니다.</li>
            <li>메타데이터와 사이트맵을 정적 생성하고 반응형 레이아웃을 구성했습니다.</li>
          </ul>
          <div className="mt-4 flex gap-4 text-sm">
            <Link href="/" className="underline decoration-gray-300 underline-offset-4 hover:text-blue-500 dark:decoration-zinc-700">Blog</Link>
            <a href="https://github.com/khj0426/HJ_Devlog" target="_blank" rel="noopener noreferrer" className="underline decoration-gray-300 underline-offset-4 hover:text-blue-500 dark:decoration-zinc-700">Source</a>
          </div>
        </div>
      </ResumeSection>

      <ResumeSection title="Activity">
        <SimpleEntry title="프로그래머스 데브코스" period="2023.06 — 2023.12">
          두 번의 팀 프로젝트와 코드 리뷰, 동료 피드백을 통해 프론트엔드 제품 개발을 학습했습니다.
        </SimpleEntry>
      </ResumeSection>

      <p className="resume-back mt-12 text-sm text-gray-500 dark:text-zinc-500">
        <Link href="/" className="underline underline-offset-4 hover:text-blue-500">← 블로그로 돌아가기</Link>
      </p>
    </article>
  );
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-gray-200 py-10 last:border-0 dark:border-zinc-800">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-500">
        {title}
      </h2>
      <div className="space-y-10">{children}</div>
    </section>
  );
}

function Experience({ company, role, period, skills, highlights }: {
  company: string;
  role: string;
  period: string;
  skills: string;
  highlights: string[];
}) {
  return (
    <div className="resume-entry">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
        <div>
          <h3 className="text-lg font-medium text-gray-950 dark:text-zinc-100">{company}</h3>
          <p className="mt-1 text-gray-700 dark:text-zinc-300">{role}</p>
        </div>
        <span className="text-sm text-gray-500 dark:text-zinc-500">{period}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-zinc-500">{skills}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">
        {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
    </div>
  );
}

function SimpleEntry({ title, period, children }: { title: string; period: string; children: React.ReactNode }) {
  return (
    <div className="resume-entry">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
        <h3 className="font-medium text-gray-950 dark:text-zinc-100">{title}</h3>
        <span className="text-sm text-gray-500 dark:text-zinc-500">{period}</span>
      </div>
      <p className="mt-2 leading-relaxed text-gray-700 dark:text-zinc-300">{children}</p>
    </div>
  );
}
