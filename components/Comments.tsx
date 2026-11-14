'use client';

import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function Comments() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    const observer = new MutationObserver(updateTheme);

    updateTheme();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-16" aria-label="댓글">
      {theme && <Giscus
        repo="khj0426/HJ_Devlog"
        repoId="R_kgDOJsCLkw"
        category="General"
        categoryId="DIC_kwDOJsCLk84CXaTn"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme}
        lang="ko"
        loading="lazy"
      />}
    </section>
  );
}
