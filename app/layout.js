import {Inter} from "next/font/google";
import "./globals.css";
import "@/lib/initMongo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata = {
  title: "DeepSeek clone",
  description: "A DeepSeek clone built with Next.js",
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          {children}
        </body>
      </html>
  );
}