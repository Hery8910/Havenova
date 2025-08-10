// app/layout.tsx (RootLayout)
import { DashboardProvider } from '../contexts/UserContext';
import { ClientProvider } from '../contexts/ClientContext';
import Navbar from '../components/navbar/page';
import Footer from '../components/footer/page';
import { getClient } from '../services/clientServices';
import './globals.css';
import { homeMetadata } from './pageMetadata';
import I18nInitializer from '../components/i18nInitializer/page';

export const metadata = homeMetadata;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const domain: string = 'havenova.de';
  const client = await getClient(domain);

  return (
    <html lang="de">
      <body>
        <ClientProvider initialClient={client}>
          <DashboardProvider>
            {/* I18nInitializer maneja idioma dinámico en cliente */}
            <I18nInitializer>
              <Navbar />
              {children}
              <Footer />
            </I18nInitializer>
          </DashboardProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
