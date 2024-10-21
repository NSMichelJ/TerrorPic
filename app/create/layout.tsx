import { Toaster } from "sonner";

import "@/app/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          classNames: {
            error:
              "flex items-center justify-center bg-gray-900 text-red-400 border border-red-400 rounded-md px-5 py-2.5 gap-2",
          },
        }}
      />
    </>
  );
}
