import type { Metadata } from "next";

// TODO: Chance it
export const metadata: Metadata = {
  title: "Root",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
