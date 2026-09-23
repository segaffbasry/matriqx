import Image from "next/image";
import { insights, site } from "@/lib/content";
import { Arrow, Button } from "./ui";
import styles from "./Redesign.module.css";
export default function Insights() {
  return (
    <>
      <section id="insights" className={`${styles.section} ${styles.insights}`}>
        <div className={styles.container}>
          <div className={styles.insightsHeading}><div><p className={styles.eyebrow}>04 / IDEAS MOVING SCIENCE FORWARD</p><h2>A new perspective.<br /><span>A new possibility.</span></h2></div><a href={`${site.url}/community/`} className={styles.textLink}>All insights <Arrow /></a></div>
          <div className={styles.editorial}>
            <a href={insights.posts[0].href} className={styles.featureArticle}><div className={styles.featureImage}><Image src={insights.posts[0].image} alt="Scientific research in the laboratory" fill sizes="(min-width: 900px) 50vw, 100vw" className="object-cover" /></div><p className={styles.eyebrow}>PERSPECTIVES / DIGITAL TWINS</p><h3>{insights.posts[0].title}<Arrow size={26} /></h3></a>
            <div className={styles.articleList}>{insights.posts.slice(1).map((post, i) => <a key={post.href} href={post.href}><span className={styles.tabNumber}>0{i + 2}</span><div><p className={styles.eyebrow}>{["AI & DISCOVERY", "SCIENTIFIC INTELLIGENCE", "HEALTHCARE INNOVATION"][i]}</p><h3>{post.title}</h3></div><Arrow className="-rotate-45" /></a>)}</div>
          </div>
        </div>
      </section>
      <section id="contact" className={styles.contact}><div className={styles.container}><p className={styles.eyebrow}>YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</p><div className={styles.contactRow}><h2>Let’s move<br />science <span>forward.</span></h2><div><p>Bring your challenges.<br />Let’s explore what’s possible.</p><Button href={site.contact} variant="light" reveal={false}>Talk to our experts</Button></div></div></div></section>
    </>
  );
}
