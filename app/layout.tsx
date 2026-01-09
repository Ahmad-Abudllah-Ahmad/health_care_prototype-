import type { Metadata } from "next";
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google"; // Verify if Noto_Nastaliq_Urdu is available, if not I might need to use Noto_Sans_Arabic or local font. I'll try Noto_Nastaliq_Urdu first.
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-urdu",
  subsets: ["arabic"],
  weight: ["400", "700"], // Noto Nastaliq usually has limited weights, or variable.
});

export const metadata: Metadata = {
  title: "Sehat Guftagu | AI Healthcare Assistant",
  description: "Bridging the gap in rural healthcare with intelligent AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${notoUrdu.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

