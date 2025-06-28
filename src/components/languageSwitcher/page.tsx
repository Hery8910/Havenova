// src/components/LanguageSwitcher.tsx
import { useI18n } from "../../contexts/I18nContext";
import { useUser } from "../../contexts/UserContext";
import { useClient } from "../../contexts/ClientContext";
import { useEffect } from "react";
import api from "../../services/api";

export default function LanguageSwitcher() {
  const { language, setLanguage, setTexts } = useI18n();
  const { user, setUser, updatePreferences } = useUser();
  const { client } = useClient();

  // Llama al backend para los textos en el nuevo idioma
  async function handleLanguageChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newLang = e.target.value;
    setLanguage(newLang);

    // Cambia textos según idioma
    if (client && client.texts && client.texts[newLang]) {
      setTexts(client.texts[newLang]);}
    // } else {
    //   // (Opcional) Trae textos actualizados del backend si necesario
    //   const { data } = await api.get(`/api/clients/by-domain/${client.domain}?lang=${newLang}`);
    //   setTexts(data.texts[newLang]);
    // }

    // Si el usuario está logueado o es guest persistente, actualiza preferencia
    if (user && user._id) {
      updatePreferences({ language: newLang });
      // (Opcional) PATCH al backend
      // await api.patch(`/api/users/${user._id}`, { language: newLang });
    }
  }

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      {/* Agrega más idiomas si tienes */}
    </select>
  );
}
