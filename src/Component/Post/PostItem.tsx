"use client";

import { Badge } from "@seed-design/react";
import Image from "next/image";
import Link from "next/link";

import styles from "./post-item.module.css";

export default function PostItem({ post }: { post: { [key: string]: string } }) {
  return (
    <article className={styles.card}>
      <Link className={styles.link} href={`/blog/${encodeURIComponent(post.slug)}`}>
        <div className={styles.content}>
          <div className={styles.meta}>
            <Badge tone="brand" variant="weak">{post.category}</Badge>
            <time>{post.date}</time>
          </div>
          <h2 className={styles.title}>{post.title}</h2>
          {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
          <span className={styles.readMore}>글 읽기 →</span>
        </div>
        {post.image && (
          <div className={styles.imageFrame}>
            <Image className={styles.image} src={post.image} fill sizes="(max-width: 640px) 112px, 220px" alt="" placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcKgkAAWkAwC+Aq/wAAAAASUVORK5CYII=" />
          </div>
        )}
      </Link>
    </article>
  );
}
