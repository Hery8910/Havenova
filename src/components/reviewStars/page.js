import styles from "./page.module.css";

const ReviewStars = ({ starRating, className }) => {
  const totalStars = 5;
  const percentage = (starRating / totalStars) * 100;

  return (
    <div className={`${styles.div_stars} ${className}`}>
      <div className={styles.div_gray}>
        {Array.from({ length: totalStars }).map((_, index) => (
          <svg
            key={index}
            className={styles.svg_gray}
            fill="inherit"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>

      <div className={styles.div_yellow} style={{ width: `${percentage}%` }}>
        {Array.from({ length: totalStars }).map((_, index) => (
          <svg
            key={index}
            className={styles.svg_yellow}
            fill="inherit"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default ReviewStars;
