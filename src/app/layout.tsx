import type { Metadata } from "next";
import ThemeProvider from '../components/ThemeProvider';
import '../styles/global.scss';

export const metadata: Metadata = {
  title: "StreamZone",
  description: "A modern Twitch-style streaming platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
