import { DashboardProvider } from "../contexts/UserContext";
import { ClientProvider } from "../contexts/ClientContext";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import { cookies } from "next/headers";
import { getClient } from "../services/clientServices";
import { getUser } from "../services/userService";
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

  const cookieStore = cookies();
  const guestId = cookieStore.get("guestId")?.value;
  const clientId = client._id;

  // Siempre llama getUser, con o sin guestId
  const user = await getUser({ clientId, guestId }); // getUser({ clientId, guestId })

  const language = user.language || "de"; // según lógica actual
  const texts = client.texts?.[language] || client.texts.en;

  return (
    <html lang={user.language || "de"}>
      <body className={user.theme || "light"}>
        <ClientProvider initialClient={client}>
          <DashboardProvider initialUser={user}>
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
