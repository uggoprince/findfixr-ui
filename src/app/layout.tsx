import type { Metadata } from "next";
import "@/styles/globals.css";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "FindFixr - Find Local Technicians",
  description: "Connect with skilled technicians in your area",
  openGraph: {
    title: "FindFixr - Find Local Technicians",
    description: "Connect with skilled technicians in your area",
    url: "https://findfixr.vercel.app",
    siteName: "FindFixr",
    images: [
      {
        url: "https://findfixr.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "FindFixr",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindFixr - Find Local Technicians",
    description: "Connect with skilled technicians in your area",
    images: ["https://findfixr.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
