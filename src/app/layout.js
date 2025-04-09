import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UZ Furniture",
  description: "Premium furniture for your home",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ "--primary-color": "#ff6b6b", "--background-color": "#ffffff", "--text-dark": "#1f2937" }}>
        {children}
      </body>
    </html>
  );
}