// Social Proof Section with Enhanced UX and Branding
import { useEffect, useState } from 'react';

function SocialProofMetrics() {
  const [isCountingCustomers, setIsCountingCustomers] = useState(false);
  const [isCountingOrders, setIsCountingOrders] = useState(false);
  const [isCountingDesigns, setIsCountingDesigns] = useState(false);
  const [customers, setCustomers] = useState(0);
  const [orders, setOrders] = useState(0);
  const [designs, setDesigns] = useState(0);

  const incrementValues = [
    { setter: setCustomers, limit: 400, step: 5, interval: 10, flag: isCountingCustomers, setFlag: setIsCountingCustomers },
    { setter: setOrders, limit: 800, step: 10, interval: 10, flag: isCountingOrders, setFlag: setIsCountingOrders },
    { setter: setDesigns, limit: 50, step: 1, interval: 20, flag: isCountingDesigns, setFlag: setIsCountingDesigns },
  ];

  useEffect(() => {
    incrementValues.forEach(({ setter, limit, step, interval, flag }) => {
      if (flag) {
        const intervalId = setInterval(() => {
          setter((prev) => (prev < limit ? prev + step : limit));
        }, interval);

        return () => clearInterval(intervalId);
      }
    });
  }, [isCountingCustomers, isCountingOrders, isCountingDesigns]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const { id } = entry.target;
            if (id === 'customers-metric') setIsCountingCustomers(true);
            if (id === 'orders-metric') setIsCountingOrders(true);
            if (id === 'designs-metric') setIsCountingDesigns(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = [
      document.getElementById('customers-metric'),
      document.getElementById('orders-metric'),
      document.getElementById('designs-metric'),
    ];

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      elements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section
      id="social-proof-metrics"
      className="relative py-20 bg-background dark:bg-darkBackground text-center text-gray-900 dark:text-darkAccent overflow-hidden"
    >
      <h2 className="text-2xl sm:text-2xl md:text-5xl font-playfair font-bold text-primary dark:text-white mb-12">
        Join Hundreds of Satisfied Customers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-8 max-w-6xl mx-auto">
        {/* Customers */}
        <div
          id="customers-metric"
          className="flex flex-col items-center space-y-3"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {customers.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">Happy Customers</p>
        </div>

        {/* Orders */}
        <div
          id="orders-metric"
          className="flex flex-col items-center space-y-3"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {orders.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">Orders Delivered</p>
        </div>

        {/* Designs */}
        <div
          id="designs-metric"
          className="flex flex-col items-center space-y-3"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {designs.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">Unique Designs</p>
        </div>
      </div>
    </section>
  );
}

export default SocialProofMetrics;
