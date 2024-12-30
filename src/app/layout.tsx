import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nothread",
  description: "Not a Threads",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden bg-zinc-950">
      <body
        className="antialiased flex flex-col items-center justify-center mx-auto mb-20 lg:mb-40 overflow-x-hidden"
      >
        <main className="flex-auto min-w-0 px-4 max-w-[640px] w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
