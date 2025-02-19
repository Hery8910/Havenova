import { UserProvider } from "../components/contexts/UserContext";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/page";
import Footer from "../components/footer/page";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "Havenova",
  description:
    "Discover premium home service solutions with flexible membership plans. Enjoy 20% off your first service and exclusive discounts for members. Simplify your tasks with our intuitive booking system!",
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
