import "./globals.css";
import "./animations.css";
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "./components/CartContent";

export const metadata = {
  title: "D'FOOTPRINT",
  description: "Perfect Fit, Perfect Price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
