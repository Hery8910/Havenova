import { DashboardProvider } from "../components/contexts/UserContext";
import { Roboto } from "next/font/google";
import { homeMetadata } from "./pageMetadata";
import "./globals.css";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

const roboto = Roboto({
  subsets: ["latin"],
  weight: [ "400", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = homeMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <DashboardProvider>
          <Navbar />
          {children}
          <Footer />
        </DashboardProvider>
      </body>
    </html>
  );
}
