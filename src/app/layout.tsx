import { DashboardProvider } from "../contexts/UserContext";
import { homeMetadata } from "./pageMetadata";
import "./globals.css";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";
import { ClientProvider } from "../contexts/ClientContext";



export const metadata = homeMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <DashboardProvider>
            <Navbar />
            {children}
            <Footer />
          </DashboardProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
