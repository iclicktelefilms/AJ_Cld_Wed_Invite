import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoveStory — Premium Wedding Invitations",
  description: "Create luxury digital wedding invitations in minutes. Built for Indian wedding photographers and studios.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "LoveStory — Premium Wedding Invitations",
    description: "Create luxury digital wedding invitations in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#1a1a1a",
              color: "#fff",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
