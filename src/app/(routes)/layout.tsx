import { Footer } from "@/components/Footer";
import Topbar from "@/components/Topbar";

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Topbar />
      {children}
      <Footer />
    </main>
  );
}
