import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NextTopLoader color="#6F5299" height={3} showSpinner={false} />
      <Header />
      <main>{children}</main>
      <Footer />
      <Toaster position="top-right" toastOptions={{ className: 'z-[9999]' }} containerStyle={{ zIndex: 99999 }} />
    </div>
  );
}
