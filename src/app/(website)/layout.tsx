import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Toaster } from "react-hot-toast";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
