import Image from "next/image";
import { cta, insights, site } from "@/lib/content";
import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";
export default function Insights() {
  return (
    <>
      <section id="insights" className={`${styles.section} ${styles.insights}`}>
        <div className={styles.container}>
          <div className={styles.insightsHeading}><div><p className={styles.eyebrow}>{insights.eyebrow}</p><h2>{insights.title}</h2></div><a href={`${site.url}/community/`} className={styles.textLink}>{insights.cta} <Arrow /></a></div>
          <div className={styles.editorial}>
            <a href={insights.posts[0].href} className={styles.featureArticle}><div className={styles.featureImage}><Image src={insights.posts[0].image} alt="Scientific research in the laboratory" fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" /></div><h3>{insights.posts[0].title}<Arrow size={26} /></h3></a>
            <div className={styles.articleList}>{insights.posts.slice(1).map((post, i) => <a key={post.href} href={post.href}><span className={styles.tabNumber}>0{i + 2}</span><div><h3>{post.title}</h3></div><Arrow className="-rotate-45" /></a>)}</div>
          </div>
        </div>
      </section>
      <section id="contact" className={styles.contact}><div className={styles.container}><div className={styles.contactRow}><h2>{cta.title}</h2><div><Button href={cta.button.href} variant="light" reveal={false}>{cta.button.label}</Button></div></div></div></section>
    </>
  );
}
