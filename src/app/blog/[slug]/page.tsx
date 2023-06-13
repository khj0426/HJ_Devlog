import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import BlogLayOut from '@/Component/Blog/LayOut';
import { getPostBySlug } from '../../../../lib/api';
import CodeBlock from '@/Component/Blog/CodeBlock';

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
      <h2>{post.title}</h2>
      <p
        style={{
          fontWeight: '700',
        }}
      >
        {post.date}
      </p>

      <ReactMarkdown
        components={{
          code: ({ node, inline, className, children, ...props }) => (
            <CodeBlock>{children as string}</CodeBlock>
          ),
          img: ({ node, ...props }) => (
            <img
              src={props.src || ''}
              alt="마크다운 이미지"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          ),
        }}
      >
        {post.content}
      </ReactMarkdown>
    </BlogLayOut>
  );
}
