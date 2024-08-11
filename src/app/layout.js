
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      {children}
      <Toaster></Toaster>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}