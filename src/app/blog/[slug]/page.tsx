import ReactMarkdown from 'react-markdown';
import PostExterct from '@/Component/Blog/Exterct';
import BlogLayOut from '@/Component/Blog/LayOut';
import { getPostBySlug } from '../../../../lib/api';
import CodeBlock from '@/Component/Blog/CodeBlock';
import rehypeRaw from 'rehype-raw';
import Comments from '@/Component/Giscus/Gitcus';
import Image from 'next/image';

export default function Post({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = getPostBySlug(params.slug, [
    'title',
    'content',
    'excerpt',
    'date',
    'author',
  ]);

  return (
    <BlogLayOut>
      <h3>{post.title}</h3>
      <PostExterct exterct={post.excerpt} />
      <p
        style={{
          fontWeight: '700',
          fontSize: '16px',
        }}
      >
        {post.date}
      </p>

      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ node, ...props }) => (
            <Image
              src={props.src || ''}
              alt="마크다운 이미지"
              layout="responsive"
              width={500}
              height={300}
            />
          ),
          code: ({ node, inline, children, ...props }) => (
            <CodeBlock>{children as string}</CodeBlock>
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>

      <Comments />
    </BlogLayOut>
  );
}
