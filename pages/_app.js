import "../styles/globals.css";
import { Noto_Serif, Inter, Open_Sans } from "next/font/google";
import AuthProvider from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/sonner";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <main
        className={`${notoSerif.variable} ${inter.className} ${openSans.variable}`}
        suppressHydrationWarning
      >
        <Component {...pageProps} />
      </main>
      <Toaster richColors />
    </AuthProvider>
  );
}
