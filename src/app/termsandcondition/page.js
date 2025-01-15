import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-primary text-secondary px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 border-b-4 border-secondary pb-4">
          Terms of Service
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">General Overview</h2>
          <p className="text-gray-700">
            D'Footprint specializes in creating custom handmade footwear
            tailored to your unique specifications. By placing an order or
            engaging with our website, you acknowledge and agree to the
            following:
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Ordering Process</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>
              <strong>Custom Orders:</strong> All orders are handmade according
              to the size, description, and preferences provided by the
              customer. It is your responsibility to ensure that all
              information provided (e.g., size, style, design) is accurate
              before finalizing your order.
            </li>
            <li>
              <strong>Payment Terms:</strong> Full payment is required at the
              time of order placement unless otherwise agreed upon. Payment
              confirms your acceptance of these Terms of Service.
            </li>
            <li>
              <strong>Order Modifications:</strong> Modifications or
              cancellations can only be made within <strong>24 hours</strong> of
              placing an order. Requests for modifications after this window may
              not be accommodated.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Shipping Policy</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>
              <strong>Delivery Timeframe:</strong> Orders will be processed and
              shipped within the timeframe communicated during purchase. Please
              allow extra time for handmade production. Delivery delays caused
              by courier services are outside of D'Footprint's control.
            </li>
            <li>
              <strong>Shipping Costs:</strong> Customers are responsible for
              shipping costs unless stated otherwise during promotional offers.
            </li>
            <li>
              <strong>Lost or Damaged Parcels:</strong> D'Footprint is not
              liable for lost or damaged parcels after they have been shipped.
              If you encounter an issue, please contact the courier service
              directly.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Returns and Exchanges</h2>
          <p className="text-gray-700">
            For details on returns and exchanges, refer to our{" "}
            <a
              href="/return-policy"
              className="text-primary font-semibold hover:underline"
            >
              Return Policy
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Customer Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>
              <strong>Account Information:</strong> If creating an account on
              our website, you are responsible for maintaining the
              confidentiality of your login information.
            </li>
            <li>
              <strong>Prohibited Use:</strong> Customers must not misuse the
              website or its services in ways that violate laws, regulations, or
              the integrity of D'Footprint.
            </li>
            <li>
              <strong>Communication:</strong> You agree to provide accurate
              contact information for order updates or support.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Limitations of Liability</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3">
            <li>
              Errors caused by inaccurate order details submitted by the
              customer.
            </li>
            <li>
              Delays or failures beyond our reasonable control, including
              natural disasters or courier-related issues.
            </li>
            <li>
              Any indirect, incidental, or consequential damages resulting from
              the use of our products.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-gray-700">
            All content, designs, and materials provided on the D'Footprint
            website are the exclusive property of D'Footprint. Any unauthorized
            use, reproduction, or distribution of this content is prohibited.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsOfService;
