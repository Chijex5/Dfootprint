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
    { setter: setCustomers, limit: 400, step: 1, interval: 10, flag: isCountingCustomers, setFlag: setIsCountingCustomers },
    { setter: setOrders, limit: 800, step: 2, interval: 10, flag: isCountingOrders, setFlag: setIsCountingOrders },
    { setter: setDesigns, limit: 200, step: 1, interval: 20, flag: isCountingDesigns, setFlag: setIsCountingDesigns },
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
      {/* Background Decorative Element */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-secondary/40 to-primary/20 blur-2xl z-0 opacity-30 animate-move-gradient"></div>

      {/* Section Header */}
      <h2
        className="text-2xl sm:text-2xl md:text-5xl font-playfair font-bold text-primary dark:text-white mb-12 relative z-10"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        Join Hundreds of Satisfied Customers
      </h2>

      {/* Metrics Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-12 px-8 max-w-6xl mx-auto relative z-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Customers */}
        <div
        id='customers-metric'
          className="flex flex-col items-center space-y-3"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {customers.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">
            Happy Customers
          </p>
        </div>

        {/* Orders */}
        <div
        id='orders-metric'
          className="flex flex-col items-center space-y-3"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {orders.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">
            Orders Delivered
          </p>
        </div>

        {/* Designs */}
        <div
          className="flex flex-col items-center space-y-3"
          id="designs-metric"
          data-aos="fade-left"
          data-aos-delay="500"
        >
          <div className="text-6xl sm:text-7xl font-extrabold text-primary dark:text-darkAccent">
            {designs.toLocaleString()} +
          </div>
          <p className="text-lg font-oswald text-secondary dark:text-darkPrimary">
            Unique Designs
          </p>
        </div>
      </div>
    </section>
  );
}

export default SocialProofMetrics;
