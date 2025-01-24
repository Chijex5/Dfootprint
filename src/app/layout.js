import "./globals.css";
import "./animations.css";
import { Analytics } from "@vercel/analytics/react"
import { CartProvider } from "./components/CartContent";
import DarkModeToggle from "./components/DarkMode";

if (typeof window !== "undefined") {
  const storedMode = localStorage.getItem("darkMode") === "true";
  if (storedMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// Define a global function for toggling dark mode
globalThis.toggleDarkMode = () => {
  const isDarkMode = document.documentElement.classList.toggle("dark");
  localStorage.setItem("darkMode", isDarkMode.toString());
};


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
      <head>
        {/* Add a script to set dark mode before the app renders */}
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedMode = localStorage.getItem('darkMode');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedMode === 'true' || (storedMode === null && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Error setting dark mode:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <CartProvider>
          <DarkModeToggle visible={false}/>
          {children}
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
