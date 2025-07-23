import { DashboardProvider } from "../contexts/UserContext";
import { ClientProvider } from "../contexts/ClientContext";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import { getClient } from "../services/clientServices";
import { I18nProvider } from "../contexts/I18nContext";
import "./globals.css";
import { homeMetadata } from "./pageMetadata";

export const metadata = homeMetadata;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const domain: string = "havenova.de";
  const client = await getClient(domain);

  const language =
  (typeof window !== "undefined" && localStorage.getItem("havenova_lang")) ||
  "de";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/i18n/${language}.json`,
    // { cache: "force-cache" }
    { cache: "no-store" }
  );
  
  const texts = await res.json();
   if (!client || !texts) return <p>Loading...</p>;
  
  return (
    <html lang={language}>
      <body>
        <ClientProvider initialClient={client}>
          <DashboardProvider>
            <I18nProvider initialLanguage={language} initialTexts={texts}>
              <Navbar />
              {children}
              <Footer />
            </I18nProvider>
          </DashboardProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
