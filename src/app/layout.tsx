import type { Metadata } from "next";
import "./globals.css";
import AddModal from "@/components/AddModal";
import Nav from "@/components/Navbar";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OTTO TODO-LIST",
  description: "Manage your tasks and stay on top of your day with OTTO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <div className="fixed left-0 top-0 -z-10 h-full w-full">
          <div className="relative h-full w-full bg-black">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
          </div>
        </div>

        <Nav />
        <AddModal />
        <div className="min-h-screen">{children}</div>

        <Toaster richColors closeButton />

        <Footer />
      </body>
    </html>
  );
}
