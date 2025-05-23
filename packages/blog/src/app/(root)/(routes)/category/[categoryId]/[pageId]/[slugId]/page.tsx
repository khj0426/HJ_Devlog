import { Metadata } from "next";

import ReactMarkdown from "react-markdown";

import rehypeRaw from "rehype-raw";

import { getPostBySlug } from "~/lib/api";
import CodeBlock from "~/src/Component/Blog/CodeBlock/CodeBlock";
import PostExtract from "~/src/Component/Blog/Extract";
import BlogLayout from "~/src/Component/Blog/Layout";
import Comments from "~/src/Component/Giscus/Gitcus";

export default function Post({
  params,
}: {
  params: {
    categoryId: string;
    slug: string;
  };
}) {
  const post = getPostBySlug(decodeURIComponent(params.slug), [
    "title",
    "content",
    "excerpt",
    "date",
    "author",
    "image",
  ]);

  const dynamicMetaData: Metadata = {
    title: post.title,
    description: post.excerpt,
    keywords: post.title,
    openGraph: {
      images: [
        {
          url: `${post.image}`,
          width: 800,
          height: 600,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
    },
    verification: {
      google: "g3Daim29whdK1ZzL1CE6pvkYyvSgM5-6C898-TVjiz0",
    },
  };

  return (
    <BlogLayout>
      <h3>{post.title}</h3>
      <PostExtract extract={post.excerpt} />
      <p
        style={{
          fontWeight: "700",
          fontSize: "16px",
        }}
      >
        {post.date}
      </p>

      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ ...props }) => (
            <img
              src={props.src || ""}
              alt="마크다운 이미지"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          ),
          code: ({ children }) => <CodeBlock>{children as string}</CodeBlock>,
        }}
      >
        {post.content}
      </ReactMarkdown>
      <Comments />
    </BlogLayout>
  );
}
