import type { Metadata } from "next";
import "@/styles/globals.css";
import { ApolloProvider } from "@/providers/ApolloProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "FindFixr - Find Local Technicians",
  description: "Connect with skilled technicians in your area",
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
