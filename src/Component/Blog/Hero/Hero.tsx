import styles from './hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="blog-introduction">
      <p className={styles.eyebrow}>FRONTEND ENGINEER&apos;S LOG</p>
      <h1 id="blog-introduction" className={styles.title}>
        배운 것을 기록하고
        <br />
        연결합니다.
      </h1>
      <p className={styles.description}>
        프론트엔드 개발과 제품에 대한 생각을 차곡차곡 쌓는 공간입니다.
      </p>
    </section>
  );
}
