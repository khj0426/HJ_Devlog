import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { reflections } from '@/content/reflections';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return reflections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const reflection = reflections.find((item) => item.slug === slug);
  if (!reflection) return {};
  return { title: reflection.title, description: reflection.summary, alternates: { canonical: `/reflection/${reflection.slug}` } };
}

export default async function ReflectionDetail({ params }: PageProps) {
  const { slug } = await params;
  const reflection = reflections.find((item) => item.slug === slug);
  if (!reflection) notFound();

  return (
    <article className="reflection-detail pb-12 pt-12">
      <header className="border-b border-gray-200 pb-8 dark:border-zinc-800">
        <Link href="/reflection" className="text-sm text-gray-500 underline underline-offset-4 hover:text-blue-500 dark:text-zinc-500">Reflection</Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-950 dark:text-zinc-100">{reflection.title}</h1>
        <p className="mt-3 text-sm text-gray-500 dark:text-zinc-500">{reflection.period}</p>
        <p className="mt-6 leading-relaxed text-gray-700 dark:text-zinc-300">{reflection.summary}</p>
      </header>
      <div className="space-y-10 py-10">
        {reflection.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-zinc-100">{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mb-4 leading-relaxed text-gray-700 dark:text-zinc-300">{paragraph}</p>)}
            {section.bullets && <ul className="list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-gray-400 dark:text-zinc-300">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>
        ))}
      </div>
      <Link href="/reflection" className="text-sm text-gray-500 underline underline-offset-4 hover:text-blue-500 dark:text-zinc-500">← 회고 목록으로</Link>
    </article>
  );
}
