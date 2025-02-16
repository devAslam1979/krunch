import { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata = {
  title: "Kruch",
  icons: {
    icon: "/favicon.png",
  },
};

export default function ServerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="max-w-[500px] mx-auto ">
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
