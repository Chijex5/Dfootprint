import "./globals.css";
import "./animations.css";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "D'FOOTPRINT",
  description: "Perfect Fit, Perfect Price",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
