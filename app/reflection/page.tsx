import type { Metadata } from 'next';
import Link from 'next/link';

import { archivedReflections, reflections } from '@/content/reflections';

export const metadata: Metadata = {
  title: 'Reflection',
  description: '반년 단위와 연간으로 기록한 회고 모음',
  alternates: { canonical: '/reflection' },
};

export default function ReflectionIndex() {
  return (
    <article className="reflection-index pb-8 pt-12">
      <header className="border-b border-gray-200 pb-10 dark:border-zinc-800">
        <p className="text-sm text-gray-500 dark:text-zinc-500">Reflection</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100">회고</h1>
        <p className="mt-5 max-w-prose leading-relaxed text-gray-600 dark:text-zinc-400">
          반년 단위와 연간으로 일과 배움을 돌아봅니다. 제품을 만들며 만난 문제와, 그 문제를 통해 배운 것들을 기록합니다.
        </p>
      </header>

      <section className="py-10">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-500">2026</h2>
        <div className="mt-6 divide-y divide-gray-200 dark:divide-zinc-800">
          {reflections.map((reflection) => (
            <Link key={reflection.slug} href={`/reflection/${reflection.slug}`} className="group block py-5 first:pt-0">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-500 dark:text-zinc-100">{reflection.title}</h3>
                <span className="text-sm text-gray-500 dark:text-zinc-500">{reflection.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-zinc-400">{reflection.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 py-10 dark:border-zinc-800">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-zinc-500">Archive</h2>
        <ul className="mt-6 space-y-3 text-sm">
          {archivedReflections.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="underline decoration-gray-300 underline-offset-4 hover:text-blue-500 dark:decoration-zinc-700">{label}</a>
            </li>
          ))}
        </ul>
      </section>

      <Link href="/" className="text-sm text-gray-500 underline underline-offset-4 hover:text-blue-500 dark:text-zinc-500">← 블로그로 돌아가기</Link>
    </article>
  );
}
