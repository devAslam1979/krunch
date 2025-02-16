"use client";

import Navbar from "./components/navbar";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ToastContainer />
        <Provider store={store}>
          <AuthProvider>
            <Navbar />
            <main className="h-[calc(100vh-52px)] bg-[#fefaed] overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200">
              {children}
            </main>
          </AuthProvider>
        </Provider>
      </Suspense>
    </div>
  );
}
