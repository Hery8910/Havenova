import styles from './page.module.css';

const Button = ({ children, onClick }: { children: string; onClick: () => void }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
