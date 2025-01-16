import "./globals.css";
import "./animations.css";
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "./components/CartContent";

export const metadata = {
  title: "D'Footprint | Luxury at Your Feet",
  description: "Perfect Fit, Perfect Price",
  description: "Luxury sneakers at affordable prices",
  description: "Shop handmade stylish shoes, perfect for Valentine’s Day gifts. Affordable, custom footwear for outings and romantic gift ideas for her.",
  description: "Shop the latest collection of luxury sneakers, custom-made for you. Perfect for casual outings, date nights, and more.",
  description: "Discover handmade leather slippers – simple, stylish, and affordable. Perfect for casual outings or as a thoughtful Valentine’s Day gift for her.",
  description: "Discover handmade leather slippers – simple, stylish, and affordable. Perfect for casual outings or as a thoughtful Valentine’s Day gift for her.",
  description: "Looking for Valentine’s gift ideas? Explore our guide to affordable handmade stylish shoes, perfect for her romantic or casual outings.",
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
