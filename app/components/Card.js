import styles from "./Card.module.css";
import Image from "next/image";

export default function Card({ name, blurb, rating, emoji, image }) {
  return (
    <article className={styles.card}>
      {image ? (
        <Image src={image} alt={name} width={230} height={150} />
      ) : (  
      <div className={styles.emoji}>{emoji}</div>
      )}
      <h2>{name}</h2>
      <p>{blurb}</p>
      <p className={styles.stars}>{"⭐".repeat(rating)}</p>
    </article>
  );
}