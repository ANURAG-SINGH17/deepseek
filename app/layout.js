import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "DeepSeek clone",
  description: "A DeepSeek clone built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
      
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <body className={`${inter.className} antialiased`}>
          <ToastContainer theme="dark"/>
        {children}
      </body>
    </html>
  );
}
