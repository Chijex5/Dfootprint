"use client";
import React, { Suspense } from "react";
import DarkModeToggle from "../components/DarkMode";
import Loader from "../components/Loader";

import HeroShopNowPage from "./components/HeroSection";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Holder from "./components/Holder";
const LazyHolder = React.lazy(() => import("./components/Holder"));
const LazyHeroShopNowPage = React.lazy(() => import("./components/HeroSection"));


const ShopNowPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const renderComponent = () => {
    if (type === "browse") {
      return (
        <Suspense fallback={<Loader />}>
          <LazyHolder />
        </Suspense>
      );
    } else {
      return (
        <Suspense fallback={<Loader />}>
          <LazyHeroShopNowPage />
        </Suspense>
      );
    }
  };


  return (
    <Suspense fallback={<Loader />}>
      <div className="bg-background dark:bg-darkBackground min-h-screen p-4">
        <header className={`fixed top-0 left-0 w-full z-50 bg-white dark:bg-darkSecondary dark:text-white shadow-lg transition-all duration-500 ease-in-out transform bg-opacity-90`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            {/* Replacing text with SVG logo */}
            <Link href="/" className="flex items-center dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" className="h-10 md:h-10" zoomAndPan="magnify" viewBox="0 0 375 374.999991" height="500" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="90cd4c857f"><path d="M 12.511719 170.238281 L 328.015625 170.238281 L 328.015625 344.238281 L 12.511719 344.238281 Z M 12.511719 170.238281 " clip-rule="nonzero"/></clipPath></defs><g fill="currentColor" fill-opacity="1"><g transform="translate(226.122955, 300.065183)"><g><path d="M 72.640625 0 L 7.8125 0 L 7.8125 -3.390625 C 14.0625 -3.390625 18.617188 -4.253906 21.484375 -5.984375 C 24.347656 -7.722656 25.78125 -11.539062 25.78125 -17.4375 L 25.78125 -172.34375 C 25.78125 -178.414062 24.347656 -182.273438 21.484375 -183.921875 C 18.617188 -185.578125 14.0625 -186.40625 7.8125 -186.40625 L 7.8125 -189.796875 L 134.34375 -189.796875 L 148.140625 -148.390625 L 144.75 -148.390625 C 140.238281 -160.191406 135.117188 -168.738281 129.390625 -174.03125 C 123.660156 -179.332031 117.191406 -182.675781 109.984375 -184.0625 C 102.785156 -185.445312 94.585938 -186.226562 85.390625 -186.40625 L 54.671875 -186.40625 L 54.671875 -101.28125 L 84.875 -101.28125 C 93.726562 -101.445312 100.28125 -102.785156 104.53125 -105.296875 C 108.78125 -107.816406 111.554688 -111.984375 112.859375 -117.796875 C 114.160156 -123.617188 114.8125 -131.390625 114.8125 -141.109375 L 118.203125 -141.109375 L 118.203125 -54.9375 L 114.8125 -54.9375 C 114.8125 -65.863281 114.160156 -74.453125 112.859375 -80.703125 C 111.554688 -86.953125 108.78125 -91.378906 104.53125 -93.984375 C 100.28125 -96.585938 93.726562 -97.890625 84.875 -97.890625 L 54.671875 -97.890625 L 54.671875 -16.921875 C 54.671875 -11.023438 56.144531 -7.25 59.09375 -5.59375 C 62.050781 -3.945312 66.566406 -3.125 72.640625 -3.125 Z M 72.640625 0 "/></g></g></g><g fill="currentColor" fill-opacity="1"><g transform="translate(55.002519, 192.228548)"><g><path d="M 7.203125 0 L 7.203125 -3.125 C 12.953125 -3.125 17.144531 -3.878906 19.78125 -5.390625 C 22.425781 -6.910156 23.75 -10.472656 23.75 -16.078125 L 23.75 -158.796875 C 23.75 -164.390625 22.425781 -167.945312 19.78125 -169.46875 C 17.144531 -170.988281 12.953125 -171.75 7.203125 -171.75 L 7.203125 -174.875 L 85.390625 -174.875 C 91.785156 -174.875 98.984375 -174.351562 106.984375 -173.3125 C 114.984375 -172.269531 123.019531 -170.1875 131.09375 -167.0625 C 139.164062 -163.945312 146.640625 -159.269531 153.515625 -153.03125 C 160.390625 -146.800781 165.90625 -138.566406 170.0625 -128.328125 C 174.226562 -118.097656 176.3125 -105.226562 176.3125 -89.71875 C 176.3125 -78.039062 174.671875 -66.800781 171.390625 -56 C 168.109375 -45.207031 162.707031 -35.613281 155.1875 -27.21875 C 147.675781 -18.820312 137.679688 -12.1875 125.203125 -7.3125 C 112.734375 -2.4375 97.382812 0 79.15625 0 Z M 77 -3.125 C 92.03125 -3.125 104.34375 -5.679688 113.9375 -10.796875 C 123.53125 -15.910156 130.96875 -22.742188 136.25 -31.296875 C 141.53125 -39.859375 145.164062 -49.210938 147.15625 -59.359375 C 149.15625 -69.515625 150.15625 -79.632812 150.15625 -89.71875 C 150.15625 -107.945312 147.15625 -123.132812 141.15625 -135.28125 C 135.164062 -147.4375 126.972656 -156.550781 116.578125 -162.625 C 106.179688 -168.707031 94.347656 -171.75 81.078125 -171.75 C 69.878906 -171.75 61.921875 -170.988281 57.203125 -169.46875 C 52.492188 -167.945312 50.140625 -164.46875 50.140625 -159.03125 L 50.140625 -16.078125 C 50.140625 -10.640625 52.175781 -7.117188 56.25 -5.515625 C 60.332031 -3.921875 67.25 -3.125 77 -3.125 Z M 77 -3.125 "/></g></g></g><g clip-path="url(#90cd4c857f)"><path fill="currentColor" d="M 273.320312 266.101562 C 275.25 266.664062 277.230469 267.09375 279.253906 267.378906 C 281.246094 267.664062 283.273438 267.808594 285.324219 267.808594 C 297.164062 267.808594 307.882812 263.011719 315.640625 255.253906 C 323.398438 247.496094 328.195312 236.78125 328.195312 224.941406 C 328.195312 213.101562 323.398438 202.382812 315.640625 194.625 C 307.882812 186.871094 297.164062 182.070312 285.324219 182.070312 C 278.746094 182.070312 272.507812 183.558594 266.933594 186.207031 C 261.140625 188.964844 256.066406 192.980469 252.058594 197.902344 C 239.929688 212.597656 230.050781 228.023438 220.175781 243.4375 C 199.828125 275.195312 179.507812 306.910156 139.792969 331.6875 C 136.167969 333.664062 132.378906 335.382812 128.453125 336.824219 C 119.359375 340.15625 109.535156 341.972656 99.277344 341.972656 C 75.863281 341.972656 54.667969 332.484375 39.328125 317.140625 C 23.984375 301.800781 14.496094 280.601562 14.496094 257.191406 C 14.496094 233.777344 23.988281 212.582031 39.328125 197.242188 C 53.839844 182.726562 73.589844 173.453125 95.5 172.492188 C 93.777344 173.738281 92.652344 175.765625 92.652344 178.058594 C 92.652344 181.847656 95.726562 184.921875 99.519531 184.921875 C 103.308594 184.921875 106.382812 181.847656 106.382812 178.058594 C 106.382812 174.757812 104.050781 172 100.949219 171.339844 L 100.964844 170.265625 L 99.285156 170.242188 C 75.273438 170.242188 53.535156 179.976562 37.800781 195.710938 C 22.066406 211.445312 12.335938 233.183594 12.335938 257.195312 C 12.335938 281.203125 22.066406 302.941406 37.800781 318.675781 C 53.535156 334.410156 75.273438 344.144531 99.285156 344.144531 C 109.792969 344.144531 119.871094 342.277344 129.203125 338.859375 C 138.871094 335.3125 147.738281 330.101562 155.449219 323.566406 C 186.3125 300.304688 204.144531 272.472656 221.996094 244.609375 C 231.84375 229.238281 241.699219 213.855469 253.734375 199.273438 L 252.898438 198.589844 L 253.738281 199.269531 C 257.539062 194.597656 262.359375 190.785156 267.859375 188.171875 C 273.148438 185.652344 279.074219 184.242188 285.332031 184.242188 C 296.570312 184.242188 306.75 188.800781 314.117188 196.164062 C 321.480469 203.53125 326.039062 213.707031 326.039062 224.949219 C 326.039062 236.191406 321.480469 246.367188 314.117188 253.734375 C 306.75 261.101562 296.570312 265.65625 285.332031 265.65625 C 283.359375 265.65625 281.429688 265.519531 279.554688 265.253906 C 277.628906 264.980469 275.75 264.574219 273.929688 264.042969 L 273.328125 266.113281 Z M 273.320312 266.101562 " fill-opacity="1" fill-rule="nonzero"/></g></svg>
            </Link>
            <nav className="flex space-x-4 items-center">
              <Link
                href="/cart"
                className="text-gray-700 hover:text-primary dark:text-white transition-colors transform hover:scale-105 duration-200"
              >
                Cart
              </Link>
              <Link href="/track" className="text-gray-700 hover:text-primary dark:text-white transition-colors transform hover:scale-105 duration-200">Track an Order</Link>
              <Link href="/product" className="text-gray-700 hover:text-primary dark:text-white transition-colors transform hover:scale-105 duration-200">Change Section</Link>
              <DarkModeToggle 
                visible={true}
              />
            </nav>
          </div>
        </header>
        <renderComponent/>
      </div>
    </Suspense>
  );
};

export default ShopNowPage;
