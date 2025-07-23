import { useUser } from "../../contexts/UserContext";
import { useI18n } from "../../contexts/I18nContext";
import styles from "./page.module.css";
import { IoLanguage } from "react-icons/io5";

export default function LanguageSwitcher() {
  const { setLanguage, language } = useI18n();
  const { updateUserLanguage, user } = useUser();

  const handleChange = async (lang: string) => {
    setLanguage(lang);
    await updateUserLanguage(lang);
  };

  return (
    <nav>
      {language === "en" ? (
        <button className={styles.button} onClick={() => handleChange("de")}>
          <IoLanguage /> DE
        </button>
      ) : (
        <button className={styles.button} onClick={() => handleChange("en")}>
          <IoLanguage /> EN
        </button>
      )}
    </nav>
  );
}
