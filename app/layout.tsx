import { Metadata } from "next";
import RootLayout from "./RootLayout";

export const metadata: Metadata = {
  title: "Krunch",
  description: "Krunch",
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

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Navbar from "./components/navbar";
// import { Suspense } from "react";
// import { ToastContainer } from "react-toastify";
// import { Provider } from "react-redux";
// import { AuthProvider } from "./context/AuthProvider";
// import { store } from "@/redux/store";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Krunch",
//   description: "Krunch",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-[500px] mx-auto `}
//       >
//         <div>
//           <Suspense fallback={<div>Loading...</div>}>
//             <ToastContainer />
//             <Provider store={store}>
//               <AuthProvider>
//                 <Navbar />
//                 <main className="h-[calc(100vh-48px)] bg-[#fefaed] overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200">
//                   {children}
//                 </main>
//               </AuthProvider>
//             </Provider>
//           </Suspense>
//         </div>
//       </body>
//     </html>
//   );
// }
