'use client';

import Giscus from '@giscus/react';

export default function Comments() {
  return (
    <section className="mt-16" aria-label="댓글">
      <Giscus
        repo="khj0426/HJ_Devlog"
        repoId="R_kgDOJsCLkw"
        category="General"
        categoryId="DIC_kwDOJsCLk84CXaTn"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme="preferred_color_scheme"
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}
