// app/layout.tsx (RootLayout)
import { DashboardProvider } from '../contexts/UserContext';
import { ClientProvider } from '../contexts/ClientContext';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import { getClient } from '../services/clientServices';
import './globals.css';
import { homeMetadata } from './pageMetadata';
import I18nInitializer from '../components/i18nInitializer/page';
import { CookiesProvider } from '../contexts/CookiesContext';
import CookieBanner from '../components/cookieBanner/page';
import GAScript from '../utils/cookies/GAScript';
import Loading from '../components/layout/loading/page';

export const metadata = homeMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const domain: string = 'havenova.de';
  const client = await getClient(domain);
  if (!client) return <Loading />;

  return (
    <html lang="de">
      <body>
        <ClientProvider initialClient={client}>
          <DashboardProvider>
            <CookiesProvider>
              {/* I18nInitializer maneja idioma dinámico en cliente */}
              <I18nInitializer>
                <CookieBanner />
                <Navbar />
                {children}
                <Footer />
                <GAScript />
              </I18nInitializer>
            </CookiesProvider>
          </DashboardProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
