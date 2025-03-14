import { UserProvider } from "../components/contexts/UserContext";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

const roboto = Roboto({
  subsets: ["latin"],
  weight: [ "400", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Havenova - Professional Home Services",
  description: "Book expert handyman services in Berlin. Trusted professionals for home repairs, cleaning, and assembly.",
  icons: {
    icon: "/svg/favicon.svg",
    shortcut: "/svg/favicon.svg",
    apple: "/svg/favicon.svg",
  },
  keywords: "home services Berlin, handyman Berlin, furniture assembly, cleaning services, plumbing, electrical repairs",
  openGraph: {
    title: "Havenova - Reliable Home Services in Berlin",
    description: "Book expert handyman services today and get a 10% discount on your first order.",
    type: "website",
    url: "https://havenova.de",
    images: [
      {
        url: "https://https://havenova.de/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Havenova Home Services",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <UserProvider>
          <Navbar />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
