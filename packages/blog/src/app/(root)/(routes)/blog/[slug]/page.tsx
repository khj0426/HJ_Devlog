import "./index.css";
import { Metadata } from "next";

import { Suspense } from "react";

import Flex from "@hj-devlog/shared/src/components/Flex/Flex";
import NavigationButton from "@hj-devlog/shared/src/components/NavigationButton/NavigationButton";
import Spinner from "@hj-devlog/shared/src/components/Spinner/Spinner";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

import { getPostBySlug, getRandomPosts } from "~/lib/api";
import makeTableOfContent from "~/lib/makeTableOfContent";
import Title from "~/src/Component/About/Title";
import CodeBlock from "~/src/Component/Blog/CodeBlock/CodeBlock";
import PostExtract from "~/src/Component/Blog/Extract";
import BlogLayout from "~/src/Component/Blog/Layout";
import PageView from "~/src/Component/Blog/PageView/PageView";
import Comments from "~/src/Component/Giscus/Gitcus";
import TOC from "~/src/Component/TOC";
import getCurrentBasePath from "~/src/utils/getCurrentBasePath";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug, [
    "title",
    "content",
    "excerpt",
    "date",
    "author",
    "image",
  ]);

  const dynamicMetaTag: Metadata = {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${getCurrentBasePath()}/blog/${decodeURIComponent(
        params.slug
      )}`,
    },
    openGraph: {
      type: "website",
      siteName: `${post.title}`,
      locale: "ko-KR",
    },
    keywords: post.title,

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
  return dynamicMetaTag;
}

export default function Post({
  params,
}: {
  params: {
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

  const TableOfContent = makeTableOfContent({
    children: post?.content,
  });

  const randomPosts = getRandomPosts(params.slug);

  return (
    <Suspense
      fallback={
        <Flex
          className=".fallback_spinner"
          style={{
            margin: "0",
            position: "relative",
            overflowX: "hidden",
            overflow: "hidden",
            overflowY: "hidden",
          }}
          width={"100%"}
          height={"100vh"}
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      }
    >
      <BlogLayout>
        <h1>{post.title}</h1>
        <Flex justifyContent="space-between">
          <PostExtract extract={post.excerpt} />
          <PageView slug={params.slug} />
        </Flex>
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
            img: ({ node, ...props }) => (
              <img
                src={props.src}
                alt={props?.alt || "마크다운 이미지"}
                style={{
                  maxWidth: "100%",
                  objectFit: "cover",
                  height: "auto",
                }}
                sizes="(max-width: 560px) 360px, (max-width: 1023px) 700px, (max-width: 1260px) 1024px, (min-width: 1261px) 1260px"
              />
            ),
            code({ children, className }) {
              const match = /language-(\w+)/.exec(className || "");
              if (match) {
                return (
                  <CodeBlock lang={match[1]}>{children as string}</CodeBlock>
                );
              }
              return <CodeBlock>{children as string}</CodeBlock>;
            },
            h2: ({ children }) => {
              return (
                <h2
                  id={children as string}
                  style={{
                    marginTop: "30px",
                    fontSize: "1.3rem",
                  }}
                >
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              return (
                <h3
                  id={children as string}
                  style={{
                    fontSize: "1.2rem",
                    marginTop: "30px",
                  }}
                >
                  {children}
                </h3>
              );
            },
            p: ({ children }) => {
              return (
                <p
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {children}
                </p>
              );
            },
            a: ({ href, children }) => {
              return (
                <a
                  target="_blank"
                  style={{
                    color: "rgb(0,131,120)",
                  }}
                  href={href}
                >
                  {children}
                </a>
              );
            },
            li: ({ children }) => {
              return (
                <li
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  {children}
                </li>
              );
            },
            pre: (props) => (
              <code
                style={{
                  fontSize: "1rem",
                }}
              >
                {props.children}
              </code>
            ),
          }}
        >
          {post.content}
        </ReactMarkdown>
        <Flex
          flexWrap="wrap"
          justifyContent="space-around"
          margin={"35px auto"}
          width={"100%"}
        >
          <NavigationButton link={randomPosts[0].title} type="prev">
            <Title
              title={randomPosts[0].title}
              style={{
                fontSize: "14px",
              }}
            ></Title>
          </NavigationButton>
          <NavigationButton link={randomPosts[1].title} type="next">
            <Title
              title={randomPosts[1].title}
              style={{
                fontSize: "14px",
              }}
            ></Title>
          </NavigationButton>
        </Flex>
        <Comments />

        <TOC toc={TableOfContent ?? []} />
      </BlogLayout>
    </Suspense>
  );
}
