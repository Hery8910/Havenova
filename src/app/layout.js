import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
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
      <body className={`${roboto.variable}`}>{children}</body>
    </html>
  );
}
